const { nailsDetailsHandler } = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/nailsdetails',
    method: 'GET',
    handler: nailsDetailsHandler.findAllNailsTypes,
  },
  {
    url: '/nailsdetails/:id',
    method: 'GET',
    handler: nailsDetailsHandler.findNailsTypesById,
  },
  {
    url: '/nailsdetails',
    method: 'POST',
    handler: nailsDetailsHandler.createNewNailsTypes,
  },
  {
    url: '/nailsdetails/:id',
    method: 'PUT',
    handler: nailsDetailsHandler.updateNailsTypes,
  },
  {
    url: '/nailsdetails/:id',
    method: 'DELETE',
    handler: nailsDetailsHandler.deleteNailsTypes,
  },
];

module.exports = routes;
