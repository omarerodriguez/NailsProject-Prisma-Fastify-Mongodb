// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');

// handlers
const Userhandler = require('../adapters/http/user-handler');

// Intance- repository
const userPrimaRepository = new UserPrismaRepository(prisma);

// Intance- usecases
const tokenUsescases = new TokenUsesCases();
const userUseCases = new UserUseCases(userPrimaRepository, tokenUsescases);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);

module.exports = { userHandler };