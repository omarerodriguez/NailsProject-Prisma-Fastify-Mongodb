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

  async findNailsDetailsById(nailsDetailsId) {
    try {
      const nailsDetail = await this.prismaClient.findFirst({
        where: { id: nailsDetailsId },
      });
      if (!nailsDetail) return [null, `NailsDetails not found`];
      return [nailsDetail, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsDetails-prisma-repository.findNailsDetailsById err: ${error.message}`,
      );
    }
  }

  async createNewNailsDetalis(newNailsDetails) {
    try {
      const nailsDetails = await this.prismaClient.create({
        data: newNailsDetails,
      });
      return [nailsDetails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsDetails-prisma-repository.createNewNailsDetalis err: ${error.message}`,
      );
    }
  }

  async updateNailsDetails(nailsDetailsId, nailsDetail) {
    try {
      const nailsDetails = await this.prismaClient.update({
        where: { id: nailsDetailsId },
        data: nailsDetail,
      });
      return [nailsDetails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsDetails-prisma-repository.updateNailsDetails err: ${error.message}`,
      );
    }
  }

  async deleteNailsDetails(nailsDetailsId) {
    try {
      const nailsDetail = await this.prismaClient.delete({
        where: { id: nailsDetailsId },
      });
      return [nailsDetail, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsDetails-prisma-repository.deleteNailsDetails err: ${error.message}`,
      );
    }
  }
};
