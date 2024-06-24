module.exports = class DetailsNailsRedisUseCases {
  constructor(redisClient, prismaRepository) {
    this.redisClient = redisClient;
    this.prismaRepository = prismaRepository;
    this.detailsNailsKey = 'details_nails';
  }

  redisFindAllDetailsNails = async () => {
    try {
      const redisDetailsNails = await this.redisClient.get(
        this.detailsNailsKey,
      );
      if (!redisDetailsNails) {
        const detailsNails = await this.prismaRepository.detailNail.findMany(
          {},
        );
        if (!detailsNails)
          return [null, 404, 'There are not details nails fetched'];
        await this.redisClient.set(
          this.detailsNailsKey,
          JSON.stringify(detailsNails),
        );
        await this.redisClient.expire(this.detailsNailsKey, 1800);
        return [detailsNails, null];
      } else {
        return [JSON.parse(redisDetailsNails), null];
      }
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNailsRedisUseCases.redisFindAllDetailsNails err: ${error.message}`,
      );
    }
  };

  redisFindAllDetailsNailsById = async (detailsNailsId) => {
    try {
      const detailNailsByIdKey = `${this.detailsNailsKey}_${detailsNailsId}`;
      const redisDetailsNailsById = await this.redisClient.get(
        detailNailsByIdKey,
      );
      if (!redisDetailsNailsById) {
        const detailNails = await this.prismaRepository.detailNail.findFirst({
          where: { id: detailsNailsId },
        });
        if (!detailNails) return [null, 404, 'error'];
        await this.redisClient.set(
          detailNailsByIdKey,
          JSON.stringify(detailNails),
        );
        await this.redisClient.expire(detailNailsByIdKey, 1800);
        return [detailNails, null];
      } else {
        return [JSON.parse(redisDetailsNailsById), null];
      }
    } catch (error) {
      return [
        false,
        `there was a error in DetailsNailsRedisUseCases.redisFindAllDetailsNails err: ${error.message}`,
      ];
    }
  };
  redisDeleteDetailNails = async () => {
    try {
      const recordLength = await this.redisClient.del([this.detailsNailsKey]);
      if (recordLength > 0) return [true, null];
      return [false, null];
    } catch (error) {
      return [
        false,
        `there was a error in DetailsNailsRedisUseCases.redisDeleteDetailsNails err: ${error.message}`,
      ];
    }
  };
};
