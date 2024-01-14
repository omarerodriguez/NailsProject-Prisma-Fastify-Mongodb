const { nailsTypesHandler } = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/nailstypes',
    method: 'GET',
    handler: nailsTypesHandler.findAllNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'GET',
    handler: nailsTypesHandler.findNailsTypesById,
  },
  {
    url: '/nailstypes',
    method: 'POST',
    handler: nailsTypesHandler.createNewNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'PUT',
    handler: nailsTypesHandler.updateNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'DELETE',
    handler: nailsTypesHandler.deleteNailsTypes,
  },
];

module.exports = routes;
