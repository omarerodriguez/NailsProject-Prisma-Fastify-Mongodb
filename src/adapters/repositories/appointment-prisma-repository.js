module.exports = class AppointmentPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllAppointments() {
    try {
      const appointmets = await this.prismaClient.appointment.findMany({});
      if (appointmets.length === 0 || !appointmets)
        return [null, `there are not schedulers fetched`];
      return [appointmets, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.findAllAppointments err: ${error.message}`,
      );
    }
  }
};
