const { getFormatDate } = require('../../utils/functions/date');

module.exports = class TypesNailsUseCases {
  constructor(prismaRepository,detailsNailsRedisUseCases,typesNailsRedisUseCases,builder) {
    this.prismaRepository = prismaRepository;
    this.detailsNailsRedisUseCases = detailsNailsRedisUseCases;
    this.typesNailsRedisUseCases = typesNailsRedisUseCases
    this.builder = builder;
  }

  findTypesNailsById = async (typesNailsId) => {
    const [findTypeNailsData, detailsNailsData] = await Promise.all([
      this.typesNailsRedisUseCases.redisFindAllTypesNailsById(
        typesNailsId,
      ),
      this.detailsNailsRedisUseCases.redisFindAllDetailsNails(),
    ]);
    const [typesNailsById,typesNailsErr] = findTypeNailsData;
    const [detailsNails,detailsNailsErr] = detailsNailsData;
    if(typesNailsErr)return[null,404,typesNailsErr];
    if(detailsNailsErr)return[null,404,detailsNailsErr];


    const buildedTypesNails = this.builder.buildRecordTypesNails(typesNailsById,detailsNails);
    return [buildedTypesNails, 200, null];
  };

  findAllTypesNails = async () => {
    const [typesNailsData,detailsNailsData] = await Promise.all([
      this.typesNailsRedisUseCases.redisFindAllTypesNails(),
      this.detailsNailsRedisUseCases.redisFindAllDetailsNails(),
    ]);
    const[typesNails,typesNailsErr] = typesNailsData;
    const[detailNails,detailNailsErr] = detailsNailsData;
    if(typesNailsErr)return [null,404,typesNailsErr];
    if(detailNailsErr)return[null,404,detailNailsErr];
    
    const buildedTypesNail = typesNails.map((typesNail)=>{
      return this.builder.buildRecordTypesNails(typesNail,detailNails)
    });
    return [buildedTypesNail,200,null];
  };

  createNewTypesNails = async (typesNailsPayload) => {
    const newTypeNailsBody = { ...typesNailsPayload };
    newTypeNailsBody.created_at = getFormatDate();

    const [newTpNails, nailsError] =
      await this.prismaRepository.createNewTypesNails(newTypeNailsBody);
    if (nailsError) return [null, 500, nailsError];
    const [isDeleted,deleteError] = await this.typesNailsRedisUseCases.redisDeleteTypesNails();
    if(deleteError)return[null,400,deleteError];
    return [newTpNails, 200, null];
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
    const [softDelete, err] = await this.prismaRepository.deleteTypesNails(
      typesNailsId,
      {
        deleted_at: getFormatDate(),
      },
    );
    if (err) return [null, 400, err];
    return [softDelete, 202, null];
  };
};
