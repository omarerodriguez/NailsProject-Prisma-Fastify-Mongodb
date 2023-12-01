
const { userHandler } = require('../../utils/intances-usecases');
const routes = [
    {
        url: '/users',
        method: 'POST',
        handler: userHandler.createNewUser,
    }
];

module.exports = routes