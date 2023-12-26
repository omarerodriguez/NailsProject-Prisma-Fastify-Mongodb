const { getFormatDate } = require('../../utils/functions/date');

module.exports = class NailsTypesUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  findNailsTpById = async (nailsTpId) => {
    const [findNailsTp, err] =
      await this.prismaRepository.findNailsTpById(nailsTpId);
    if (err) return [null, 404, err];
    return [findNailsTp, 200, null];
  };

  findAllNailsTypes = async () => {
    const [nailsTypes, err] = await this.prismaRepository.findAllNailsTypes();
    if (err) return [null, 404, err];
    return [nailsTypes, 200, null];
  };

  createNewNailsTypes = async (nailsTpPayload) => {
    const [findNailsTp, nailsError] =
      await this.prismaRepository.findNailsTpById(nailsTpPayload.id);
    if (nailsError) return [null, 500, nailsError];
    if (findNailsTp) return [null, 400, 'NailsTypes already exist'];

    const newNailsTypeBody = { ...nailsTpPayload };
    newNailsTypeBody.created_at = getFormatDate();

    const [newNailsType, err] =
      await this.prismaRepository.createNewNailsTypes(newNailsTypeBody);
    if (err) return [null, 400, err];
    return [newNailsType, 201, null];
  };

  updateNailsTypes = async (nailsTpId, nailsTpPayload) => {
    const [nailsTypes, err] = await this.prismaRepository.updateNailsTypes(
      nailsTpId,
      nailsTpPayload,
    );
    if (err) return [null, 400, err];
    return [nailsTypes, 200, null];
  };

  deleteNailsType = async (nailsTpId) => {
    const [deleteNailsTp, err] =
      await this.prismaRepository.deleteNailsTp(nailsTpId);
    if (err) return [null, 400, err];
    return [deleteNailsTp, 202, null];
  };
};
