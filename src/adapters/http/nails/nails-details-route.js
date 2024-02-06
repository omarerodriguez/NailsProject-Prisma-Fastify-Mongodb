const {
  nailsDetailsHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/nailsdetails',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: nailsDetailsHandler.findAllNailsDetails,
  },
  {
    url: '/nailsdetails/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: nailsDetailsHandler.findNailsDetailsById,
  },
  {
    url: '/nailsdetails',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsDetailsHandler.createNewNailsDetalis,
  },
  {
    url: '/nailsdetails/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsDetailsHandler.updateNailsDetails,
  },
  {
    url: '/nailsdetails/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsDetailsHandler.deleteNailsDetails,
  },
];

module.exports = routes;
