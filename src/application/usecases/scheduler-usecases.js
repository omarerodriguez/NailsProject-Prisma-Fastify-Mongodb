const { getFormatDate } = require('../../utils/functions/date');

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

  createNewScheduler = async (schedulerPayload) => {
    const newScheduler = { ...schedulerPayload };
    newScheduler.created_at = getFormatDate();

    const [scheduler, err] = await this.prismaRepository.createNewScheduler(
      schedulerPayload,
    );
    if (err) return [null, 404, err];
    return [scheduler, 200, null];
  };

  updateScheduler = async (schedulerId, schedulerPayload) => {
    const [updateScheduler, err] = await this.prismaRepository.updateScheduler(
      schedulerId,
      schedulerPayload,
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
