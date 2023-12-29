module.exports = class NailsDetailsUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  findAllNailsDetails = async () => {
    const [nailsDetails, err] =
      await this.prismaRepository.findAllNailsDetails();
    if (err) return [null, 404, err];
    return [nailsDetails, 200, null];
  };
};
