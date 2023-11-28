
const ProductsController = require('../controllers/user.controller');
const routes =[
    {
        url: '/users',
        method: 'GET',
        handler: ProductsController.getUsers,
    },
    {
        url: '/users/:id',
        method: 'GET',
        handler: ProductsController.getUser,
    },
    
    {
        url: '/users',
        method: 'POST',
        handler: ProductsController.createUser,
    },
    {
        url: '/users/:id',
        method: 'PUT',
        handler:ProductsController.updateUser,
    },
    {
        url: '/users/:id',
        method: 'DELETE',
        handler:ProductsController.deleteUser,
    }
]

module.exports = routes