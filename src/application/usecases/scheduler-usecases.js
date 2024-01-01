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
};
