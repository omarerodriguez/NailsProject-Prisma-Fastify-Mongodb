// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const NailsTypesPrismaRepositoryPrismaRepository = require('../adapters/repositories/nailsTypes-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const NailsTypesUseCases = require('../application/usecases/nailsTypes-usecases');

// handlers
const Userhandler = require('../adapters/http/user/user-handler');
const NailsTypesHandler = require('../adapters/http/nailsTypes/nailsTypes-handler');

// Intance- repository
const userPrimaRepository = new UserPrismaRepository(prisma);
const nailsTypesPrimaRepository =
  new NailsTypesPrismaRepositoryPrismaRepository(prisma);

// Intance- usecases
const nailsTypesUseCases = new NailsTypesUseCases(nailsTypesPrimaRepository);
const tokenUsescases = new TokenUsesCases();
const userUseCases = new UserUseCases(userPrimaRepository, tokenUsescases);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);
const nailsTypesHandler = new NailsTypesHandler(nailsTypesUseCases);

module.exports = { userHandler, nailsTypesHandler };
