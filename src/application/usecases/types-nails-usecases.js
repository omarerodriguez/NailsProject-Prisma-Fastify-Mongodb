const { getFormatDate } = require('../../utils/functions/date');

module.exports = class TypesNailsUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  findTypesNailsById = async (typesNailsId) => {
    const [findTpNails, err] = await this.prismaRepository.findTypesNailsById(
      typesNailsId,
    );
    if (err) return [null, 404, err];
    return [findTpNails, 200, null];
  };

  findAllTypesNails = async () => {
    const [typesNails, err] = await this.prismaRepository.findAllTypesNails();
    if (err) return [null, 404, err];
    return [typesNails, 200, null];
  };

  createNewTypesNails = async (typesNailsPayload) => {
    const [newTpNails, nailsError] =
      await this.prismaRepository.createNewTypesNails(typesNailsPayload);
    if (nailsError) return [null, 500, nailsError];
    return [newTpNails, 200, null];

    /* const newTypeNailsBody = { ...nailsTpPayload };
    newTypeNailsBody.created_at = getFormatDate();

    const [newNailsType, err] =
      await this.prismaRepository.createNewTypesNails(newNailsTypeBody);
    if (err) return [null, 400, err];
    return [newNailsType, 201, null];*/
  };

  updateTypesNails = async (typesNailsId, typesNailsPayload) => {
    const [typesNails, err] = await this.prismaRepository.updateTypesNails(
      typesNailsId,
      typesNailsPayload,
    );
    if (err) return [null, 400, err];
    return [typesNails, 200, null];
  };

  deleteTypesNails = async (typesNailsId) => {
    const [deletetypesNails, err] =
      await this.prismaRepository.deleteTypesNails(typesNailsId);
    if (err) return [null, 400, err];
    return [deletetypesNails, 202, null];
  };
};
