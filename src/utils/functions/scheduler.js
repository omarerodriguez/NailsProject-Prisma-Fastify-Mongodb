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
  reservedAt,
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
  delete newScheduler.id;
  const parseDate = new Date(hour);
  let hourByDate = parseDate.getHours();
  const minutesByDate = parseDate.getMinutes();
  hourByDate = minutesByDate === 30 ? (hourByDate += 0.5) : hourByDate;
  const allowHours = Object.keys(newScheduler.appointments);
  let hourRevisor = hourByDate;

  for (let index = 0; index < numOfSessions; index++) {
    const err = errorOcupedAppoinment(
      newScheduler.appointments[hourRevisor],
      hourRevisor,
      hourByDate,
      parseDate,
    );
    if (err) return [null, err];
    if (!allowHours.includes(`${hourRevisor}`))
      return [
        null,
        'Horario de reserva no disponible, esta hora no esta habilitada.',
      ];
    newScheduler.appointments[hourRevisor] = appointmentId;
    hourRevisor += 0.5;
  }

  return [newScheduler, null];
};

module.exports = {
  setAppoinments,
  updateAppoinments,
};
