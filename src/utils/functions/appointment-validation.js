const validateAppointmentByUser = (appointmets, findUserId) => {
  return Object.values(appointmets).find((userId) => userId === findUserId);
};

module.exports = { validateAppointmentByUser };
