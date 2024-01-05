const appointments = require('../const/scheduler');
const { addHour } = require('../functions/date');

const setAppoinments = (schedulerPayload) => {
  schedulerPayload.appointments = appointments;
  return schedulerPayload;
};

const errorOcupedAppoinment = (
  currentHourAppointmentObject,
  currentHourAppoinment,
  hourAppoinment,
  reservedAt
) => {
  if (currentHourAppointmentObject) {
    if (currentHourAppoinment === hourAppoinment) {
      return `Horarios de reserva no disponible ya existe una cita para la hora de inicio de la cita: ${reservedAt}`;
    } else if (currentHourAppoinment !== hourAppoinment) {
      const conflictHour = addHour(
        reservedAt,
        hourAppoinment - currentHourAppoinment,
      );
      return `Horarios de reserva no disponible, no hay tiempo suficiente para completar el servicio: ${conflictHour}`; // MEJROAR MENSAJE
    }
  }
  return null;
};

const updateAppoinments = (scheduler, appointmentId, hour, numOfSessions) => {
  const newScheduler = { ...scheduler };
  let hourRevisor = hour;

  for (let index = 0; index < numOfSessions; index++) {
    const err = errorOcupedAppoinment(
      newScheduler.appointments[hourRevisor],
      hour,
    );
    if (err) return [null, err];

    newScheduler.appointments[hourRevisor] = appointmentId;
    hourRevisor += 0.5;
  }

  return [newScheduler, null];
};

module.exports = {
  setAppoinments,
  updateAppoinments,
};
