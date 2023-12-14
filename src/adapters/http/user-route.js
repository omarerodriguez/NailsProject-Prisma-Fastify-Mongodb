
const { validateToken } = require('../../utils/functions/input-validations');
const { userHandler } = require('../../utils/intances-usecases');
const routes = [
    {
        url: '/users',
        method: 'GET',
        handler: userHandler.findAllUsers,
    },
    {
        url: '/users/:id',
        method: 'GET',
        handler: userHandler.findUserById,
    },
    {
        url: '/users/',
        method: 'GET',
        handler: userHandler.findUserByEmail,
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
        preHandler: validateToken,
        handler: userHandler.updateUser,
    },
    {
        url: '/users/:id',
        method: 'DELETE',
        handler: userHandler.deleteUser,
    }
];

module.exports = routes