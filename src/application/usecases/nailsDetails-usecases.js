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

  findNailsDetailsById = async (nailsDetailsId) => {
    const [nailsDetail, err] = await this.prismaRepository.findNailsDetailsById(
      nailsDetailsId,
    );
    if (err) return [null, 404, err];
    return [nailsDetail, 200, null];
  };

  createNewNailsDetalis = async (nailsDetailPayload) => {
    const [newNailsDetails, err] =
      await this.prismaRepository.createNewNailsDetalis(nailsDetailPayload);
    if (err) return [null, 404, err];
    return [newNailsDetails, 200, null];
  };
};
