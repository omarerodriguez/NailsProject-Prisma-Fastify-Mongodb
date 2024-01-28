module.exports = class AppointmentPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllAppointments() {
    try {
      const appointmets = await this.prismaClient.appointment.findMany({});
      if (appointmets.length === 0 || !appointmets)
        return [null, `there are not appointment fetched`];
      return [appointmets, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.findAllAppointments err: ${error.message}`,
      );
    }
  }
  async findAppointmentById(appointmentId) {
    try {
      const appointment = await this.prismaClient.appointment.findFirst({
        where: { id: appointmentId },
      });
      if (!appointment) return [null, `Appointment not found`];
      return [appointment, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.findAppointmentById err: ${error.message}`,
      );
    }
  }
  async findAppointmentByUser(userId) {
    try {
      const userInAppointment = await this.prismaClient.appointment.findMany({
        where: {
          appointment: {
            is: {
              user_id: userId,
            },
          },
        },
      });
      if (!userInAppointment) return [null, `User into appointment not found`];
      return [userInAppointment, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.findAppointmentByUser err: ${error.message}`,
      );
    }
  }
  async createNewAppointment(newAppointment) {
    try {
      const appointment = await this.prismaClient.appointment.create({
        data: newAppointment,
      });
      return [appointment, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.createNewAppointment err: ${error.message}`,
      );
    }
  }
  async updateAppointment(appointmentId, appointment) {
    try {
      const updateAppointment = await this.prismaClient.appointment.update({
        where: { id: appointmentId },
        data: appointment,
      });
      return [updateAppointment, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.updateAppointment err: ${error.message}`,
      );
    }
  }
  async deleteAppointment(appointmentId) {
    try {
      const deleteAppointment = await this.prismaClient.appointment.delete({
        where: { id: appointmentId },
      });
      return [deleteAppointment, null];
    } catch (error) {
      throw new Error(
        `there was a error in appointment-prisma-repository.deleteAppointment err: ${error.message}`,
      );
    }
  }
};
