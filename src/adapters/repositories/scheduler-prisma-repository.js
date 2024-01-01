module.exports = class SchedulerPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllScheduler() {
    try {
      const schedulers = await this.prismaClient.scheduler.findMany({});
      if (schedulers.length === 0 || !schedulers)
        return [null, `there are not schedulers fetched`];
      return [schedulers, null];
    } catch (error) {
      throw new Error(
        `there was a error in scheduler-prisma-repository.findAllScheduler err: ${error.message}`,
      );
    }
  }
  async findSchedulerById(schedulerId) {
    try {
      const scheduler = await this.prismaClient.scheduler.findFirst({
        where: { id: schedulerId },
      });
      if (!scheduler) return [null, `Scheduler not found`];
      return [scheduler, null];
    } catch (error) {
      throw new Error(
        `there was a error in scheduler-prisma-repository.findSchedulerById err: ${error.message}`,
      );
    }
  }
};
