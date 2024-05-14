module.exports = class RedisRepository {
  constructor(redisClient, prismaRepository) {
    this.redisClient = redisClient;
    this.prismaRepository = prismaRepository;
  }
  async redisFindAllDetailsNails() {
    try {
      const redisDetailsNails = await this.redisClient.get('detailsnails');
      if (!redisDetailsNails) {
        const detailsNails = await this.prismaRepository.detailNail.findMany(
          {},
        );
        if (!detailsNails) return [null, 404, 'There are not users fetched'];
        await this.redisClient.set(
          'detailsnails',
          JSON.stringify(detailsNails),
          'EX',
          1800,
        );
        return [detailsNails, null];
      } else {
        return [JSON.parse(redisDetailsNails), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in redis-repository.redisFindAllDetailsNails err: ${error.message}`,
      );
    }
  }

  async redisFindAllDetailsNailsById(detailsNailsId) {
    try {
      const redisDetailsNailsById = await this.redisClient.get(detailsNailsId);
      if (!redisDetailsNailsById) {
        const detailNails = await this.prismaRepository.detailNail.findFirst({
          where: { id: detailsNailsId },
        });
        if (!detailNails) return [null, 404, 'There are not users fetched'];
        await this.redisClient.set(detailsNailsId, JSON.stringify(detailNails));
        await this.redisClient.expire(detailsNailsId,1800);
        return [detailNails, null];
      } else {
        return [JSON.parse(redisDetailsNailsById), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in redis-repository.redisFindAllDetailsNails err: ${error.message}`,
      );
    }
  }


  async redisFindAllTypesNails() {
    try {
      const redisTypesNails = await this.redisClient.get('typesnails');
      if (!redisTypesNails) {
        const typesNails = await this.prismaRepository.TypeNail.findMany(
          {},
        );
        if (!typesNails) return [null, 404, 'There are not users fetched'];
        await this.redisClient.set(
          'typesnails',
          JSON.stringify(typesNails),
          'EX',
          1800,
        );
        return [typesNails, null];
      } else {
        return [JSON.parse(redisTypesNails), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in redis-repository.redisFindAllDetailsNails err: ${error.message}`,
      );
    }
  }

  async redisFindAllTypesNailsById(typesNailsId) {
    try {
      const redisTypesNailsById = await this.redisClient.get(typesNailsId);
      if (!redisTypesNailsById) {
        const typeNails = await this.prismaRepository.TypeNail.findFirst({
          where: { id: typesNailsId }
        });
        if (!typeNails) return [null, 404, 'There are not users fetched'];
        await this.redisClient.set(
          typesNailsId,
          JSON.stringify(typeNails),
          'EX',
          1800,
        );
        return [typeNails, null];
      } else {
        return [JSON.parse(redisTypesNailsById), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in redis-repository.redisFindAllDetailsNails err: ${error.message}`,
      );
    }
  }
};
