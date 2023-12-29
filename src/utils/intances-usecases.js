// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const NailsTypesPrismaRepository = require('../adapters/repositories/nailstypes-prisma-repository');
const NailsDetailsPrismaRepository = require('../adapters/repositories/nailsdetails-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const NailsTypesUseCases = require('../application/usecases/nailstypes-usecases');
const NailsDetailsUseCases = require('../application/usecases/nailsdetails-usecases');

// handlers
const Userhandler = require('../adapters/http/user/user-handler');
const NailsTypesHandler = require('../adapters/http/nails/nailstypes-handler');
const NailsDetailsHandler = require('../adapters/http/nails/nailsdetails-handler');

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
