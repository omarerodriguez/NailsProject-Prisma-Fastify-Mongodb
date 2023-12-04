
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
        url: '/users/:id',
        method: 'PUT',
        handler: userHandler.updateUser,
    },
    {
        url: '/users/:id',
        method: 'DELETE',
        handler: userHandler.deleteUser,
    }
];

module.exports = routes