// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');
const {renderRedis} = require('../infraestructura/redis/redisConfig.js');
const jwt = require('jsonwebtoken');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const TypesNailsPrismaRepository = require('../adapters/repositories/types-nails-prisma-repository');
const DetailsNailsPrismaRepository = require('../adapters/repositories/details-nails-prisma-repository.js');
const SchedulerPrismaRepository = require('../adapters/repositories/scheduler-prisma-repository');
const AppointmentPrismaRepository = require('../adapters/repositories/appointment-prisma-repository');
//const RedisRepository = require("../adapters/repositories/redis-repository.js");

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const TypesNailsUseCases = require('../application/usecases/types-nails-usecases.js');
const DetailsNailsUseCases = require('../application/usecases/details-nails-usecases.js');
const SchedulerUseCases = require('../application/usecases/scheduler-usecases');
const AppointmentUseCases = require('../application/usecases/appointment-usecases');
const DetailsNailsRedisUseCases = require('../application/usecases/redis/details-nails-redis-usecases.js');
const TypesNailsRedisUseCases  = require('../application/usecases/redis/types-nails-redis-usecases');

// Handlers
const Userhandler = require('../adapters/http/user/user-handler');
const TypesNailsHandler = require('../adapters/http/nails/types-nails-handler');
const DetailsNailsHandler = require('../adapters/http/nails/details-nails-handler.js');
const SchedulerHandler = require('../adapters/http/scheduler/scheduler-handler');
const AppointmentHandler = require('../adapters/http/appointment/appointment-handler');

//Builder
const builder = require('../application/usecases/builder/appointment/index.js');

// MiddleWares
const TokenMiddleWare = require('../adapters/http/middleware/authentication');

// Intance- repository
const userPrismaRepository = new UserPrismaRepository(prisma);
const typesNailsPrismaRepository = new TypesNailsPrismaRepository(prisma);
const detailsNailsPrismaRepository = new DetailsNailsPrismaRepository(prisma);
const schedulerPrismaRepository = new SchedulerPrismaRepository(prisma);
const appointmentPrismaRepository = new AppointmentPrismaRepository(prisma);

// Intance- usecases
const detailsNailsRedisUseCases = new DetailsNailsRedisUseCases(renderRedis,prisma)
const typesNailsRedisUseCases = new TypesNailsRedisUseCases(renderRedis,prisma)

const typesNailsUseCases = new TypesNailsUseCases(
  typesNailsPrismaRepository,
  detailsNailsRedisUseCases,
  typesNailsRedisUseCases,
  builder,
);
const detailsNailsUseCases = new DetailsNailsUseCases(
  detailsNailsPrismaRepository,
  detailsNailsRedisUseCases,
  typesNailsRedisUseCases
);
const schedulerUseCases = new SchedulerUseCases(schedulerPrismaRepository);
const appointmentUseCases = new AppointmentUseCases(
  appointmentPrismaRepository,
  userPrismaRepository,
  typesNailsPrismaRepository,
  detailsNailsPrismaRepository,
  schedulerUseCases,
  schedulerPrismaRepository,
  builder,
  detailsNailsRedisUseCases,
  typesNailsRedisUseCases,
);
const tokenUsescases = new TokenUsesCases(jwt);
const userUseCases = new UserUseCases(userPrismaRepository, tokenUsescases);
// Intance - Middlewares
const tokenMiddleWare = new TokenMiddleWare(tokenUsescases);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);
const typesNailsHandler = new TypesNailsHandler(typesNailsUseCases);
const detailsNailsHandler = new DetailsNailsHandler(detailsNailsUseCases);
const schedulerHandler = new SchedulerHandler(schedulerUseCases);
const appointmentHandler = new AppointmentHandler(appointmentUseCases);

module.exports = {
  userHandler,
  typesNailsHandler,
  detailsNailsHandler,
  schedulerHandler,
  appointmentHandler,
  tokenMiddleWare,
};
