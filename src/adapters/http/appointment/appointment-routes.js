const { appointmentHandler } = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/appointments',
    method: 'GET',
    handler: appointmentHandler.findAllAppointments,
  },
  {
    url: '/appointments/:id',
    method: 'GET',
    handler: appointmentHandler.findAppointmentById,
  },
  {
    url: '/appointments/userid/:id',
    method: 'GET',
    handler: appointmentHandler.findAppointmentByUser,
  },
  {
    url: '/appointments',
    method: 'POST',
    handler: appointmentHandler.createNewAppointment,
  },
  {
    url: '/appointments/:id',
    method: 'PUT',
    handler: appointmentHandler.updateAppointment,
  },
  {
    url: '/appointments/:id',
    method: 'DELETE',
    handler: appointmentHandler.deleteAppointment,
  },
];

module.exports = routes;
