module.exports = class NailsTypesPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllNailsTypes() {
    try {
      const nailsTps = await this.prismaClient.nailType.findMany({});
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
      const nailsTp = await this.prismaClient.nailType.findFirst({
        where: { id: nailsTpId },
        include: {
          allowed_detalis: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });
      if (!nailsTp) return [null, 'NailsTypes not found'];
      return [nailsTp, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.findNailsTypesById err: ${error.message}`,
      );
    }
  }

  async createNewNailsTypes(newNailsType) {
    try {
      const nailsTp = await this.prismaClient.nailType.create({
        data: newNailsType,
      });
      return [nailsTp, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.createNewNailsType err: ${error.message}`,
      );
    }
  }

  async updateNailsTypes(nailsTpId, nailsType) {
    try {
      const nailsTps = await this.prismaClient.nailType.update({
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
      const nailsTp = await this.prismaClient.nailType.delete({
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
