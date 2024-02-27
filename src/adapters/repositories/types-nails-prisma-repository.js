module.exports = class TypesNailsPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllTypesNails() {
    try {
      const typesNails = await this.prismaClient.TypeNail.findMany({});
      if (typesNails.length === 0 || !typesNails)
        return [null, 'there are not nails types fetched'];
      return [typesNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.findAllTypesNails err: ${error.message}`,
      );
    }
  }

  async findTypesNailsById(typesNailsId) {
    try {
      const typeNails = await this.prismaClient.TypeNail.findFirst({
        where: { id: typesNailsId },
        include: {
          allowed_detalis: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });
      if (!typeNails) return [null, 'NailsTypes not found'];
      return [typeNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.findTypesNailsById err: ${error.message}`,
      );
    }
  }

  async createNewTypesNails(newTypeNails) {
    try {
      const typeNails = await this.prismaClient.TypeNail.create({
        data: newTypeNails,
      });
      return [typeNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.createNewNailsType err: ${error.message}`,
      );
    }
  }

  async updateTypesNails(typesNailsId, typesNails) {
    try {
      const typeNails = await this.prismaClient.TypeNail.update({
        where: { id: typesNailsId },
        data: typesNails,
      });
      return [typeNails, null];
    } catch (error) {
      throw new Error(
        `there was a error in nailsTypes-prisma-repository.updateNailsType err: ${error.message}`,
      );
    }
  }

  async deleteTypesNails(typesNailsId) {
    try {
      const typeNails = await this.prismaClient.TypeNail.delete({
        where: { id: typesNailsId },
      });
      return [typeNails, null];
    } catch (error) {
      throw new Error(
        `There was a error in nailsTypes-prisma-repository.deleteTypesNails err: ${error.message}`,
      );
    }
  }
};
