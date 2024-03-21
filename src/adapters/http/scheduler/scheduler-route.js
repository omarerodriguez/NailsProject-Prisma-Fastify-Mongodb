const {
  schedulerHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/scheduler-date',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: schedulerHandler.findSchedulersByDate,
  },
  {
    url: '/scheduler',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: schedulerHandler.findAllSchedulers,
  },
  {
    url: '/scheduler/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: schedulerHandler.findSchedulerById,
  },
  {
    url: '/scheduler',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: schedulerHandler.createNewScheduler,
  },
  {
    url: '/scheduler/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: schedulerHandler.updateScheduler,
  },
  {
    url: '/scheduler/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: schedulerHandler.deleteScheduler,
  },
];

module.exports = routes;
