module.exports = class NailsTypesPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllNailsTypes() {
    try {
      const nailsTps = await this.prismaClient.nailstypes.findMany({});
      if (nailsTps.length === 0 || !nailsTps)
        return [null, 'there are not nails types fetched'];
      return [nailsTps, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.findAllNailsTypes err: ${error.message}`,
      );
    }
  }

  async findNailsTypesById(nailsTpId) {
    try {
      const nailsTp = await this.prismaClient.nailsTp.findFirst({
        where: { id: nailsTpId },
      });
      if (!nailsTp) return [null, 'NailsTypes not found'];
      return [nailsTp, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.findNailsTypesById err: ${error.message}`,
      );
    }
  }

  async createNewNailsType(newNailsType) {
    try {
      const nailsTp = await this.prismaClient.nailsTp.create({
        data: newNailsType,
      });
      return [nailsTp, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.createNewNailsType err: ${error.message}`,
      );
    }
  }

  async updateNailsType(nailsTpId, nailsType) {
    try {
      const nailsTps = await this.prismaClient.nailsTp.update({
        where: { id: nailsTpId },
        data: nailsType,
      });
      return [nailsTps, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.updateNailsType err: ${error.message}`,
      );
    }
  }

  async deleteNailsTypes(nailsTpId) {
    try {
      const nailsTp = await this.prismaClient.nailsTp.delete({
        where: { id: nailsTpId },
      });
      return [nailsTp, null];
    } catch (error) {
      throw new Error(
        `There was a error in nailsTypes-prisma-repository.deleteNailsTypes err: ${error.message}`,
      );
    }
  }
};
