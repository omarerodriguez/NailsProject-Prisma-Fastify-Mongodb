const {
  appointmentHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/appointments',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.findAllAppointments,
  },
  {
    url: '/appointments/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.findAppointmentById,
  },
  {
    url: '/appointments/user',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.findAppointmentByUser,
  },
  {
    url: '/appointments',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.createNewAppointment,
  },
  {
    url: '/appointments/:id',
    method: 'PATCH',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.updateAppointment,
  },
  {
    url: '/appointments/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: appointmentHandler.deleteAppointment,
  },
];

module.exports = routes;
