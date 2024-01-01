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
};
