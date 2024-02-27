module.exports = class DetailsNailsPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }
  async findAllDetailsNails(ids) {
    try {
      const whereClause = ids
        ? {
            where: {
              id: {
                in: ids,
              },
            },
          }
        : {};
      const detailsNails = await this.prismaClient.detailNail.findMany(
        whereClause,
      );
      if (detailsNails.length === 0 || !detailsNails)
        return [null, `there are not nails details fetched`];
      return [detailsNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNails-prisma-repository.findAllDetailsNails err: ${error.message}`,
      );
    }
  }

  async findDetailsNailsById(detailsNailsId) {
    try {
      const detailNails = await this.prismaClient.detailNail.findFirst({
        where: { id: detailsNailsId },
      });
      if (!detailNails) return [null, `DetailsNails not found`];
      return [detailNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNails-prisma-repository.findDetailsNailsById err: ${error.message}`,
      );
    }
  }

  async createNewNailsDetalis(newDetailsNails) {
    try {
      const detailsNails = await this.prismaClient.detailNail.create({
        data: newDetailsNails,
      });
      return [detailsNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNails-prisma-repository.createNewNailsDetalis err: ${error.message}`,
      );
    }
  }

  async updateDetailsNails(DetailsNailsId, nailsDetail) {
    try {
      const detailsNails = await this.prismaClient.detailNail.update({
        where: { id: DetailsNailsId },
        data: nailsDetail,
      });
      return [detailsNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNails-prisma-repository.updateDetailsNails err: ${error.message}`,
      );
    }
  }

  async deleteDetailsNails(DetailsNailsId) {
    try {
      const detailsNails = await this.prismaClient.detailNail.delete({
        where: { id: DetailsNailsId },
      });
      return [detailsNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in DetailsNails-prisma-repository.deleteDetailsNails err: ${error.message}`,
      );
    }
  }
};
