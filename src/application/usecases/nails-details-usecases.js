const { getFormatDate } = require('../../utils/functions/date');
module.exports = class DetailsNailsUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }

  findAllDetailsNails = async () => {
    const [DetailsNails, err] =
      await this.prismaRepository.findAllDetailsNails();
    if (err) return [null, 404, err];
    return [DetailsNails, 200, null];
  };

  findDetailsNailsById = async (DetailsNailsId) => {
    const [detailNail, err] = await this.prismaRepository.findDetailsNailsById(
      DetailsNailsId,
    );
    if (err) return [null, 404, err];
    return [detailNail, 200, null];
  };

  createNewNailsDetalis = async (detailsNailsPayload) => {
    const newDetailsNailsBody = { ...detailsNailsPayload };
    newDetailsNailsBody.created_at = getFormatDate();

    const [newDetailsNails, err] =
      await this.prismaRepository.createNewNailsDetalis(newDetailsNailsBody);
    if (err) return [null, 404, err];
    return [newDetailsNails, 200, null];
  };

  updateDetailsNails = async (DetailsNailsId, nailsDetailPayload) => {
    const [updateNailsDetail, err] =
      await this.prismaRepository.updateDetailsNails(
        DetailsNailsId,
        nailsDetailPayload,
      );
    if (err) return [null, 404, err];
    return [updateNailsDetail, 200, null];
  };

  deleteDetailsNails = async (DetailsNailsId) => {
    const [deleteDetailNails, err] =
      await this.prismaRepository.deleteDetailsNails(DetailsNailsId);
    if (err) return [null, 404, err];
    return [deleteDetailNails, 200, null];
  };
};
