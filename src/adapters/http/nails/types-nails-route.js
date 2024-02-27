const {
  typesNailsHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/typesnails',
    method: 'GET',
    //preHandler: [tokenMiddleWare.verifyUserToken],
    handler: typesNailsHandler.findAllTypesNails,
  },
  {
    url: '/typesnails/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: typesNailsHandler.findTypesNailsById,
  },
  {
    url: '/typesnails',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: typesNailsHandler.createNewTypesNails,
  },
  {
    url: '/typesnails/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: typesNailsHandler.updateTypesNails,
  },
  {
    url: '/typesnails/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: typesNailsHandler.deleteTypesNails,
  },
];

module.exports = routes;
