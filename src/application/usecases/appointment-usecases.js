const { getFormatDate } = require('../../utils/functions/date');
const {
  validateAppointmentByUser,
} = require('./../../utils/functions/appointment-validation');

module.exports = class AppointmentUseCases {
  constructor(
    prismaRepository,
    userPrismaRepository,
    nailsTypesPrismaRepository,
    nailsDetailsPrismaRepository,
    schedulerUseCases,
  ) {
    this.prismaRepository = prismaRepository;
    this.userPrismaRepository = userPrismaRepository;
    this.nailsDetailsPrismaRepository = nailsDetailsPrismaRepository;
    this.nailsTypesPrismaRepository = nailsTypesPrismaRepository;
    this.schedulerUseCases = schedulerUseCases;
  }
  findAllAppointments = async () => {
    const [appointmets, err] =
      await this.prismaRepository.findAllAppointments();
    if (err) return [null, 404, err];
    return [appointmets, 200, null];
  };
  findAppointmentById = async (appointmentId) => {
    const [appointment, err] = await this.prismaRepository.findAppointmentById(
      appointmentId,
    );
    if (err) return [null, 404, err];
    return [appointment, 200, null];
  };
  findAppointmentByUser = async (userId) => {
    const [appointment, err] =
      await this.prismaRepository.findAppointmentByUser(userId);
    if (err) return [null, 404, err];
    return [appointment, 200, null];
  };
  createNewAppointment = async (appointmentPayload) => {
    const {
      scheduler_id: schedulerId,
      user_id: userId,
      types_of_nails_id: typesOfNailsId,
      details_of_nails: detailsOfNails,
    } = appointmentPayload;

    const [userData, typeOfNailsData, nailsDetailsData] = await Promise.all([
      this.userPrismaRepository.findUserById(userId),
      this.nailsTypesPrismaRepository.findNailsTypesById(typesOfNailsId),
      this.nailsDetailsPrismaRepository.findAllNailsDetails(detailsOfNails),
    ]);
    const [, userErr] = userData;
    const [, typeOfNailsErr] = typeOfNailsData;
    const [, nailsDetailsErr] = nailsDetailsData;

    if (userErr) return [null, 404, userErr];
    if (typeOfNailsErr) return [null, 404, typeOfNailsErr];
    if (nailsDetailsErr) return [null, 404, nailsDetailsErr];

    const [scheduler, status, schedulerError] =
      await this.schedulerUseCases.findSchedulerById(schedulerId);
    if (schedulerError) return [null, status, schedulerError];
    /**
     * valida si un usuario tiene dos citas el mismo dia
     */
    const appointmentExist = validateAppointmentByUser(
      scheduler.appointmets,
      userId,
    );
    if (appointmentExist)
      return [
        null,
        400,
        'Ya tiene una cita agendada para el dia de hoy, solo puede tener una cita por dia',
      ];

    const newAppointment = {
      ...appointmentPayload,
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

  updateAppointment = async (appointmentPayload, appointmentId) => {
    const [appointment, errAppoinment] =
      await this.prismaRepository.updateAppointment(
        appointmentId,
        appointmentPayload,
      );
    if (errAppoinment) return [null, 404, err];
    return [appointment, 200, null];
  };
  deleteAppointment = async (appointmentId) => {
    const [deleteAppointment, err] =
      await this.prismaRepository.deleteAppointment(appointmentId);
    if (err) return [null, 404, err];
    return [deleteAppointment, 200, null];
  };
};
