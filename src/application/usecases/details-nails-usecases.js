const { getFormatDate } = require('../../utils/functions/date');
module.exports = class DetailsNailsUseCases {
  constructor(prismaRepository,detailsNailsRedisUseCases) {
    this.prismaRepository = prismaRepository;
    this.detailsNailsRedisUseCases = detailsNailsRedisUseCases
  }

  findAllDetailsNails = async () => {
    const [detailsNails, err] =
      await this.detailsNailsRedisUseCases.redisFindAllDetailsNails();
    if (err) return [null, 404, err];
    return [detailsNails, 200, null];
  };

  findDetailsNailsById = async (detailsNailsId) => {
    const [detailNail, err] = await this.detailsNailsRedisUseCases.redisFindAllDetailsNailsById(
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
    const [isDeleted,deleteError] = await this.detailsNailsRedisUseCases.redisDeleteDetailNails();
    if(deleteError)return[null,400,deleteError];
    return [newDetailsNails, 200, null];
  };

  updateDetailsNails = async (detailsNailsId, detailNailsPayload) => {
    const [currentDetailNails,findErr] = await this.prismaRepository.findDetailsNailsById(detailsNailsId)
    if(findErr)return[null, 404, 'Details Nails not found'];

    const { id, ...currentDetailWithoutId } = currentDetailNails;
    const updatedDetailNailsData = {
      ...currentDetailWithoutId,
      ...detailNailsPayload,
    };

    const [updateNailsDetail, err] =
      await this.prismaRepository.updateDetailsNails(
        detailsNailsId,
        updatedDetailNailsData,
      );
    const [isDeleted,deleteError] = await this.detailsNailsRedisUseCases.redisDeleteDetailNails();
    if(deleteError)return[null,400,deleteError];

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
