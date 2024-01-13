const { schedulerHandler } = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/scheduler-date',
    method: 'GET',
    handler: schedulerHandler.findSchedulersByDate,
  },
  {
    url: '/scheduler',
    method: 'GET',
    handler: schedulerHandler.findAllSchedulers,
  },
  {
    url: '/scheduler/:id',
    method: 'GET',
    handler: schedulerHandler.findSchedulerById,
  },
  {
    url: '/scheduler',
    method: 'POST',
    handler: schedulerHandler.createNewScheduler,
  },
  {
    url: '/scheduler/:id',
    method: 'PUT',
    handler: schedulerHandler.updateScheduler,
  },
  {
    url: '/scheduler/:id',
    method: 'DELETE',
    handler: schedulerHandler.deleteScheduler,
  },
];

module.exports = routes;
