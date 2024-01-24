module.exports = class UserPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllUsers() {
    try {
      const users = await this.prismaClient.user.findMany({});
      if (users.length === 0 || !users)
        return [null, 'There are not users fetched'];
      return [users, null];
    } catch (error) {
      throw new Error(
        `There war a error in user-prisma-repository.findAllUsers err: ${error.message}`,
      );
    }
  }

  async findUserById(userId) {
    try {
      const user = await this.prismaClient.user.findFirst({
        where: { id: userId },
      });
      if (!user) return [null, 'user not found'];
      return [user, null];
    } catch (error) {
      throw new Error(
        `There war a error in user-prisma-repository.findUserById err: ${error.message}`,
      );
    }
  }

  async findUserByEmail(userEmail) {
    try {
      const email = await this.prismaClient.user.findFirst({
        where: { email: userEmail },
      });
      if (!email) return [null, 'Email not found'];
      return [email, null];
    } catch (error) {
      throw new Error(
        `There war a error in user-prisma-repository.findUserByEmail err: ${error.message}`,
      );
    }
  }

  async findUserByPhoneNumber(userPhoneNumber) {
    try {
      const phoneNumber = await this.prismaClient.user.findFirst({
        where: { phone_number: userPhoneNumber },
      });
      if (!phoneNumber) return [null, 'Phone number not found'];
      return [phoneNumber, null];
    } catch (error) {
      throw new Error(
        `There war a error in user-prisma-repository.findUserByEmail err: ${error.message}`,
      );
    }
  }

  async createNewUser(newUserPayload) {
    try {
      const user = await this.prismaClient.user.create({
        data: newUserPayload,
      });
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-prisma-repository.createNewuser ${error.message}`,
      );
    }
  }

  async loginUser(email) {
    try {
      const email = this.findUserByEmail(email);
      if (!email || undefined) return [null, 'email not found or no valid'];
      return [email, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-prisma-repository.registerUser ${error.message}`,
      );
    }
  }

  async updateUser(userId, userPayload) {
    try {
      const user = await this.prismaClient.user.update({
        where: { id: userId },
        data: userPayload,
      });
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-prisma-repository.updateuser ${error.message}`,
      );
    }
  }

  async deleteUser(userId) {
    try {
      const user = await this.prismaClient.user.delete({
        where: { id: userId },
      });
      return [user, null];
    } catch (error) {
      throw new Error(
        `There was a error in user-prisma-repository.deleteuser ${error.message}`,
      );
    }
  }
};
