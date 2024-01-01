module.exports = class SchedulerUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }
  findAllSchedulers = async () => {
    const [schedulers, err] = await this.prismaRepository.findAllSchedulers();
    if (err) return [null, 404, err];
    return [schedulers, 200, null];
  };
};
