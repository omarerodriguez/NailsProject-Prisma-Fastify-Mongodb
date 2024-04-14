module.exports = class AppointmentPrismaRepository {
  constructor(prismaClient) {
    this.prismaClient = prismaClient;
  }

  async findAllAppointments() {
    try {
      const appointments = await this.prismaClient.appointment.findMany({
        include: {
          user: true,
          types_of_nails: true,
        },
      });

      if (appointments.length === 0 || !appointments)
        return [null, `there are not appointment fetched`];
      return [appointments, null];
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
        include: {
          user: true,
          types_of_nails: true,
        },
        
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
        where: { user_id: userId },
        include: {
          user: true,
          types_of_nails: true,
        },
      });
      if (!userInAppointment || userInAppointment.length === 0) return [null, `User into appointment not found`];
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
