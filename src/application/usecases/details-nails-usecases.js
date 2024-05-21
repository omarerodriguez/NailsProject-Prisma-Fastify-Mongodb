const { getFormatDate } = require('../../utils/functions/date');
module.exports = class DetailsNailsUseCases {
  constructor(prismaRepository,detailsNailsRedisUseCases) {
    this.prismaRepository = prismaRepository;
    this.detailsNailsRedisUseCases = detailsNailsRedisUseCases
  }

  findAllDetailsNails = async (role) => {
    const [allDetailsNails, err] =
      await this.detailsNailsRedisUseCases.redisFindAllDetailsNails();
    if (err) return [null, 404, err];
    const filterDetailsNails = (role === "USER") ? allDetailsNails.filter((detailsNails)=>!detailsNails.deleted_at) :  allDetailsNails;
    if(filterDetailsNails.length === 0)return [[],200,null];
    return [filterDetailsNails, 200, null];
  };

  findDetailsNailsById = async (detailsNailsId,role) => {
    const [detailNail, err] = await this.detailsNailsRedisUseCases.redisFindAllDetailsNailsById(
      detailsNailsId,
    );
    if (err) return [null, 404, err];
    if(role !='ADMIN' && detailNail.deleted_at)return [null,404,'el detalle o servicio de uñas esta desactivado']
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
