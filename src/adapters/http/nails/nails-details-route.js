const { nailsDetailsHandler } = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/nailsdetails',
    method: 'GET',
    handler: nailsDetailsHandler.findAllNailsDetails,
  },
  {
    url: '/nailsdetails/:id',
    method: 'GET',
    handler: nailsDetailsHandler.findNailsDetailsById,
  },
  {
    url: '/nailsdetails',
    method: 'POST',
    handler: nailsDetailsHandler.createNewNailsDetalis,
  },
  {
    url: '/nailsdetails/:id',
    method: 'PUT',
    handler: nailsDetailsHandler.updateNailsDetails,
  },
  {
    url: '/nailsdetails/:id',
    method: 'DELETE',
    handler: nailsDetailsHandler.deleteNailsDetails,
  },
];

module.exports = routes;
