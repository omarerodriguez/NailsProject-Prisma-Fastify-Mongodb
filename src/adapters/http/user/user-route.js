const {
  userHandler,
  tokenMiddleWare,
} = require('../../../utils/intances-usecases');

const routes = [
  {
    url: '/users',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: userHandler.findAllUsers,
  },
  {
    url: '/users/:id',
    method: 'GET',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: userHandler.findUserById,
  },
  {
    url: '/users',
    method: 'POST',
    handler: userHandler.createNewUser,
  },
  {
    url: '/users/login',
    method: 'POST',
    handler: userHandler.loginUser,
  },
  {
    url: '/users/:id',
    method: 'PUT',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: userHandler.updateUser,
  },
  {
    url: '/users/:id',
    method: 'DELETE',
    preHandler: [tokenMiddleWare.verifyAdminToken],
    handler: userHandler.deleteUser,
  },
];

module.exports = routes;
