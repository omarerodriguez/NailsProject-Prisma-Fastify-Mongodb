const validateAppointmentByUser = (appointmets, appointmeIdOfUser) => {
  return Object.values(appointmets).find((userId) => userId === appointmeIdOfUser);
};

const validateAppointmentsByUser = (appointmetsByScheduler, appoinmentsByUser) => {
  for (const appointment of appoinmentsByUser) {
    if (validateAppointmentByUser(appointmetsByScheduler, appointment.id)) {
      return true
    }
  }
  return false
}

module.exports = { validateAppointmentsByUser };
