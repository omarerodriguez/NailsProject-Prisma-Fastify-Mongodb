module.exports = class TypesNailsRedisUseCases {
  constructor(redisClient, prismaRepository) {
    this.redisClient = redisClient;
    this.prismaRepository = prismaRepository;
    this.typesNailsKey = 'types_nails';
  }

  redisFindAllTypesNails = async () => {
    try {
      const redisTypesNails = await this.redisClient.get(this.typesNailsKey);
      console.log(redisTypesNails);
      if (!redisTypesNails) {
        const typesNails = await this.prismaRepository.TypeNail.findMany({});
        if (!typesNails) return [null, 404, error];
        await this.redisClient.set(
          this.typesNailsKey,
          JSON.stringify(typesNails),
        );
        await this.redisClient.expire(this.typesNailsKey, 1800);
        return [typesNails, null];
      } else {
        return [JSON.parse(redisTypesNails), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in TypesNailsRedisUseCases.redisFindAllTypesNails err: ${error.message}`,
      );
    }
  };

  redisFindAllTypesNailsById = async (typesNailsId) => {
    try {
      const typesNailsByIdKey = `${this.typesNailsKey}_${typesNailsId}`;
      const redisTypesNailsById = await this.redisClient.get(
        typesNailsByIdKey
      );
      if (!redisTypesNailsById) {
        const typeNails =
          await this.prismaRepository.TypeNail.findFirst({
            where: { id: typesNailsId },
          });
        if (!typeNails) return [null, 404, error];
        await this.redisClient.set(
          typesNailsByIdKey,
          JSON.stringify(typeNails),
        );
        await this.redisClient.expire(typesNailsByIdKey, 1800);
        return [typeNails, null];
      } else {
        return [JSON.parse(redisTypesNailsById), null];
      }
    } catch (error) {
      return [
        false,
        `there was a error in TypesNailsRedisUseCases.redisFindAllTypesNails err: ${error.message}`,
      ]
    }
  };
  redisDeleteTypesNails = async () => {
    try {
      const recordLength = await this.redisClient.del([this.typesNailsKey]);
      if (recordLength > 0) return [true, null];
    } catch (error) {
      return [
        false,
        `there was a error in TypesNailsRedisUseCases.redisDeleteTypesNails err: ${error.message}`,
      ];
    }
  };
};
