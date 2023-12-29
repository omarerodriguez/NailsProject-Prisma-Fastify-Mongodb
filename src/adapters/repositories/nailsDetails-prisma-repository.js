module.exports = class NailsDetailsPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }
  async findAllNaislDetails() {
    try {
      const nailsdetails = await this.prismaClient.findMany({});
      if (nailsdetails.length === 0 || !nailsdetails)
        return [null, `there are not nails details fetched`];
      return [nailsdetails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsDetails-prisma-repository.findAllNailsDetails err: ${error.message}`,
      );
    }
  }
};
