const { getFormatDate } = require('../../utils/functions/date');
module.exports = class DetailsNailsUseCases {
  constructor(prismaRepository,redisRepository) {
    this.prismaRepository = prismaRepository;
    this.redisRepository = redisRepository
  }

  findAllDetailsNails = async () => {
    const [detailsNails, err] =
      await this.redisRepository.redisFindAllDetailsNails();
    if (err) return [null, 404, err];
    return [detailsNails, 200, null];
  };

  findDetailsNailsById = async (detailsNailsId) => {
    const [detailNail, err] = await this.redisRepository.redisFindAllDetailsNailsById(
      detailsNailsId,
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

  updateDetailsNails = async (detailsNailsId, nailsDetailPayload) => {
    const [updateNailsDetail, err] =
      await this.prismaRepository.updateDetailsNails(
        detailsNailsId,
        nailsDetailPayload,
      );
    if (err) return [null, 404, err];
    return [updateNailsDetail, 200, null];
  };

  deleteDetailsNails = async (detailsNailsId) => {
    const [deleteDetailNails, err] =
      await this.prismaRepository.deleteDetailsNails(detailsNailsId, {
        deleted_at: getFormatDate(),
      });
    if (err) return [null, 404, err];
    return [deleteDetailNails, 200, null];
  };
};
