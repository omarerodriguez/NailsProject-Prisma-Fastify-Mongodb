const { getFormatDate } = require('../../utils/functions/date');
const { setAppoinments, updateAppoinments } = require('../../utils/functions/scheduler');
module.exports = class SchedulerUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }
  findAllSchedulers = async () => {
    const [schedulers, err] = await this.prismaRepository.findAllSchedulers();
    if (err) return [null, 404, err];
    return [schedulers, 200, null];
  };

  findSchedulerById = async (schedulerId) => {
    const [scheduler, err] = await this.prismaRepository.findSchedulerById(
      schedulerId,
    );
    if (err) return [null, 404, err];
    return [scheduler, 200, null];
  };

  createNewScheduler = async (schedulerPayload = {}) => {
    const newScheduler = setAppoinments(schedulerPayload);
    newScheduler.created_at = getFormatDate();

    const [scheduler, err] = await this.prismaRepository.createNewScheduler(
      newScheduler,
    );
    if (err) return [null, 404, err];
    return [scheduler, 200, null];
  };

  updateScheduler = async (schedulerId, appointmentId, userId) => {
    const [scheduler, errScheduler] = await this.prismaRepository.findSchedulerById(
      schedulerId,
    );
    if (errScheduler) return [null, 404, err];

    const [updatedScheduler, errUpdateAppoinment] = updateAppoinments(scheduler,"APOINMENT", "appointment.reserved_at", "appointment.duration");
    if (errUpdateAppoinment) return [null, 400, errUpdateAppoinment];

    const [updateScheduler, err] = await this.prismaRepository.updateScheduler(
      schedulerId,
      updatedScheduler,
    );
    if (err) return [null, 404, err];
    return [updateScheduler, 200, null];
  };

  deleteScheduler = async (schedulerId) => {
    const [deletescheduler, err] = await this.prismaRepository.deleteScheduler(
      schedulerId,
    );
    if (err) return [null, 404, err];
    return [deletescheduler, 200, null];
  };
};
