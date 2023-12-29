// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const NailsTypesPrismaRepository = require('../adapters/repositories/nailsTypes-prisma-repository');
const NailsDetailsPrismaRepository = require('../adapters/repositories/nailsDetails-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const NailsTypesUseCases = require('../application/usecases/nailsTypes-usecases');
const NailsDetailsUseCases = require('../application/usecases/nailsDetails-usecases');

// handlers
const Userhandler = require('../adapters/http/user/user-handler');
const NailsTypesHandler = require('../adapters/http/nails/nailsTypes-handler');
const NailsDetailsHandler = require('../adapters/http/nails/nailsDetails-handler');

// Intance- repository
const userPrismaRepository = new UserPrismaRepository(prisma);
const nailsTypesPrismaRepository = new NailsTypesPrismaRepository(prisma);
const nailsDetailsPrismaRepository = new NailsDetailsPrismaRepository(prisma);

// Intance- usecases
const nailsTypesUseCases = new NailsTypesUseCases(nailsTypesPrismaRepository);
const nailsDetailsUseCases = new NailsDetailsUseCases(
  nailsDetailsPrismaRepository,
);
const tokenUsescases = new TokenUsesCases();
const userUseCases = new UserUseCases(userPrismaRepository, tokenUsescases);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);
const nailsTypesHandler = new NailsTypesHandler(nailsTypesUseCases);
const nailsDetailsHandler = new NailsDetailsHandler(nailsDetailsUseCases);

module.exports = { userHandler, nailsTypesHandler, nailsDetailsHandler };
