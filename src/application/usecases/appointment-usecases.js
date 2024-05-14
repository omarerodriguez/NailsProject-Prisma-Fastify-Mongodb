const { getFormatDate } = require('../../utils/functions/date');
const {
  validateAppointmentsByUser,
} = require('./../../utils/functions/appointment-validation');

module.exports = class AppointmentUseCases {
  constructor(
    prismaRepository,
    userPrismaRepository,
    typesNailsPrismaRepository,
    detailsNailsPrismaRepository,
    schedulerUseCases,
    schedulerPrismaRepository,
    builder,
    detailsNailsRedisUseCases,
    typesNailsRedisUseCases,
  ) {
    this.prismaRepository = prismaRepository;
    this.userPrismaRepository = userPrismaRepository;
    this.detailsNailsPrismaRepository = detailsNailsPrismaRepository;
    this.typesNailsPrismaRepository = typesNailsPrismaRepository;
    this.schedulerUseCases = schedulerUseCases;
    this.schedulerPrismaRepository = schedulerPrismaRepository;
    this.builder = builder;
    this.detailsNailsRedisUseCases = detailsNailsRedisUseCases;
    this.typesNailsRedisUseCases = typesNailsRedisUseCases;
  }
  findAllAppointments = async () => {
    const [appointmentsData, detailsNailsData] = await Promise.all([
      this.prismaRepository.findAllAppointments(),
      this.detailsNailsRedisUseCases.redisFindAllDetailsNails(),
    ]);
    const [appointments, appointmentsErr] = appointmentsData;
    const [detailsNails, detailsNailsErr] = detailsNailsData;
    if (appointmentsErr) return [null, 404, appointmentsErr];
    if (detailsNailsErr) return [null, 404, detailsNailsErr];
    const buildedAppointments = appointments.map((appointment) => {
      return this.builder.buildRecordAppointment(appointment, detailsNails);
    });
    return [buildedAppointments, 200, null];
  };
  findAppointmentById = async (appointmentId) => {
    const [appointment, err] = await this.prismaRepository.findAppointmentById(
      appointmentId,
    );
    if (err) return [null, 404, err];

    const [detailsNails, detailsNailsErr] =
      await this.detailsNailsRedisUseCases.redisFindAllDetailsNails();
    if (detailsNailsErr) return [null, 404, detailsNailsErr];

    const buildedAppointment = this.builder.buildRecordAppointment(
      appointment,
      detailsNails,
    );
    if (err) return [null, 404, err];

    return [buildedAppointment, 200, null];
  };
  findAppointmentByUser = async (decodedToken) => {
    const userId = decodedToken;
    const [appointment, err] =
      await this.prismaRepository.findAppointmentByUser(userId);
    if (err) return [null, 404, err];

    const [detailsNails, detailsNailsErr] =
      await this.detailsNailsRedisUseCases.redisFindAllDetailsNails();
    if (detailsNailsErr) return [null, 404, detailsNailsErr];

    const buildedAppointmentByUser = appointment.map((appointment) => {
      return this.builder.buildRecordAppointment(appointment, detailsNails);
    });

    if (err) return [null, 404, err];
    return [buildedAppointmentByUser, 200, null];
  };
  createNewAppointment = async (appointmentPayload, decodedToken) => {
    const { userId } = decodedToken;
    const {
      scheduler_id: schedulerId,
      types_of_nails_id: typesOfNailsId,
      details_of_nails: detailsOfNails,
    } = appointmentPayload;

    const [userData, typeOfNailsData, detailsNailsData, AppointmentData] =
      await Promise.all([
        this.userPrismaRepository.findUserById(userId),
        this.typesNailsRedisUseCases.redisFindAllTypesNailsById(typesOfNailsId),
        this.detailsNailsRedisUseCases.redisFindAllDetailsNails(detailsOfNails),
        this.prismaRepository.findAppointmentByUser(userId),
      ]);
    const [appointmentsRecord, appointmentErr] = AppointmentData;
    const [, userErr] = userData;
    const [, typeOfNailsErr] = typeOfNailsData;
    const [, detailsNailsErr] = detailsNailsData;

    if (userErr) return [null, 404, userErr];
    if (typeOfNailsErr) return [null, 404, typeOfNailsErr];
    if (detailsNailsErr) return [null, 404, detailsNailsErr];

    const [scheduler, status, schedulerError] =
      await this.schedulerUseCases.findSchedulerById(schedulerId);
    if (schedulerError) return [null, status, schedulerError];

    /**
     * valida si un usuario tiene dos citas el mismo dia
     */
    if (!appointmentErr) {
      const appointmentExist = validateAppointmentsByUser(
        scheduler.appointments,
        appointmentsRecord,
      );

      if (appointmentExist)
        return [
          null,
          400,
          'Ya tiene una cita agendada para el dia de hoy, solo puede tener una cita por dia',
        ];
    }

    const newAppointment = {
      ...appointmentPayload,
      user_id: userId,
      status_date: getFormatDate(),
      created_at: getFormatDate(),
      status: 'RESERVED',
    };

    /**
     * scheduler id solo se usa para validar citas existentes, no para la creacion
     */
    delete newAppointment.scheduler_id;

    const status_logs = [
      { code: newAppointment.status, date: newAppointment.status_date },
    ];
    newAppointment.status_logs = status_logs;

    const [appointment, err] = await this.prismaRepository.createNewAppointment(
      newAppointment,
    );
    if (err) return [null, 500, err];

    const [, , schedulerErr] = await this.schedulerUseCases.updateScheduler(
      schedulerId,
      appointment,
    );

    if (schedulerErr) {
      await this.deleteAppointment(appointment.id);
      return [null, 400, schedulerErr];
    }
    return [appointment, 200, null];
  };

  updateAppointment = async (appointmentId, appointmentPayload) => {
    const [recordAppointment, err] =
      await this.prismaRepository.findAppointmentById(appointmentId);

    if (err) return [null, 404, err];

    if (appointmentPayload.status === recordAppointment.status) {
      return [null, 400, 'the status must be different to allow update'];
    }

    if (appointmentPayload.status) {
      const newStatusLog = {
        code: appointmentPayload.status,
        date: getFormatDate(),
      };
      appointmentPayload.status_logs = [
        ...recordAppointment.status_logs,
        newStatusLog,
      ];
    }

    const [appointment, errAppoinment] =
      await this.prismaRepository.updateAppointment(
        appointmentId,
        appointmentPayload,
      );

    if (errAppoinment) return [null, 404, err];
    return [appointment, 200, null];
  };

  deleteAppointment = async (appointmentId) => {
    const [schedulers, schedulersErr] =
      await this.schedulerPrismaRepository.findAllSchedulers();
    if (schedulersErr) return [null, 404, schedulersErr];

    const [newScheduler, ifSchedulerFinded] = deletedAppointmentInScheduler(
      schedulers,
      appointmentId,
    );

    if (!ifSchedulerFinded || !newScheduler)
      return [null, 400, 'scheduler dont exist'];

    const [, softDeleteAppointmentData] = await Promise.all([
      this.schedulerPrismaRepository.updateScheduler(newScheduler.id, {
        appointments: newScheduler.appointments,
      }),
      this.prismaRepository.deleteAppointment(appointmentId, {
        deleted_at: getFormatDate(),
      }),
    ]);
    const [softDeleteAppointment, softDeleteErr] = softDeleteAppointmentData;
    if (softDeleteErr) return [null, 404, softDeleteErr];
    
    return [softDeleteAppointment, 200, null];
  };

  deletedAppointmentInScheduler = (schedulers, appointmentId) => {
    let newScheduler;
    let ifSchedulerFinded = false;
    schedulers.forEach((scheduler) => {
      if (ifSchedulerFinded) return;
      Object.entries(scheduler.appointments).forEach(([hour, value]) => {
        if (value === appointmentId) {
          scheduler.appointments[hour] = null;
          newScheduler = { ...scheduler };
          ifSchedulerFinded = true;
          return;
        }
      });
    });
    return [newScheduler, ifSchedulerFinded];
  };
};
