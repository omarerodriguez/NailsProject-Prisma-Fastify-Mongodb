const { getFormatDate } = require('../../utils/functions/date');

module.exports = class AppointmentUseCases {
  constructor(prismaRepository) {
    this.prismaRepository = prismaRepository;
  }
  findAllAppointments = async () => {
    const [appointmets, err] =
      await this.prismaRepository.findAllAppointments();
    if (err) return [null, 404, err];
    return [appointmets, 200, null];
  };
  findAppointmentById = async (appointmentId) => {
    const [appointment, err] = await this.prismaRepository.findAppointmentById(
      appointmentId,
    );
    if (err) return [null, 404, err];
    return [appointment, 200, null];
  };
};
