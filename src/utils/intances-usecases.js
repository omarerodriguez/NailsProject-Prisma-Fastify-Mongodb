// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');

// handlers
const Userhandler = require('../adapters/http/user-handler');

// Intance- repository
const userPrimaRepository = new UserPrismaRepository(prisma);

// Intance- usecases
const userUseCases = new UserUseCases(userPrimaRepository);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);

module.exports = { userHandler };