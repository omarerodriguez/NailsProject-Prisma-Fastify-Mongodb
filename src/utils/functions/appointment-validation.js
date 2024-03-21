const validateAppointmentByUser = (appointments, appointmentIdOfUser) => {
  return Object.values(appointments).find(
    (userId) => userId === appointmentIdOfUser,
  );
};

const validateAppointmentsByUser = (
  appointmentsByScheduler,
  appoinmentsByUser,
) => {
  for (const appointment of appoinmentsByUser) {
    if (validateAppointmentByUser(appointmentsByScheduler, appointment.id)) {
      return true;
    }
  }
  return false;
};

module.exports = { validateAppointmentsByUser };
