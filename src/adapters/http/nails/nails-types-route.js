const {
  nailsTypesHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/nailstypes',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: nailsTypesHandler.findAllNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyUserToken],
    handler: nailsTypesHandler.findNailsTypesById,
  },
  {
    url: '/nailstypes',
    method: 'POST',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsTypesHandler.createNewNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsTypesHandler.updateNailsTypes,
  },
  {
    url: '/nailstypes/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: nailsTypesHandler.deleteNailsTypes,
  },
];

module.exports = routes;
