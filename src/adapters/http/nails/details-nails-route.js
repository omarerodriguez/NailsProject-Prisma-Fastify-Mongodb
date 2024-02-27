const {
  detailsNailsHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/detailsnails',
    method: 'GET',
    //preHandler: [tokenMiddleWare.verifyUserToken],
    handler: detailsNailsHandler.findAllDetailsNails,
  },
  {
    url: '/detailsnails/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: detailsNailsHandler.findDetailsNailsById,
  },
  {
    url: '/detailsnails',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: detailsNailsHandler.createNewNailsDetalis,
  },
  {
    url: '/detailsnails/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: detailsNailsHandler.updateDetailsNails,
  },
  {
    url: '/detailsnails/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: detailsNailsHandler.deleteDetailsNails,
  },
];

module.exports = routes;
