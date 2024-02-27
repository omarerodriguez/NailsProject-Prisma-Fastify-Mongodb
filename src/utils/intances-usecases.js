// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');
const jwt = require('jsonwebtoken');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const TypesNailsPrismaRepository = require('../adapters/repositories/types-nails-prisma-repository');
const NailsDetailsPrismaRepository = require('../adapters/repositories/nails-details-prisma-repository');
const SchedulerPrismaRepository = require('../adapters/repositories/scheduler-prisma-repository');
const AppointmentPrismaRepository = require('../adapters/repositories/appointment-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const TypesNailsUseCases = require('../application/usecases/types-nails-usecases.js');
const NailsDetailsUseCases = require('../application/usecases/nails-details-usecases');
const SchedulerUseCases = require('../application/usecases/scheduler-usecases');
const AppointmentUseCases = require('../application/usecases/appointment-usecases');

// Handlers
const Userhandler = require('../adapters/http/user/user-handler');
const TypesNailsHandler = require('../adapters/http/nails/types-nails-handler');
const NailsDetailsHandler = require('../adapters/http/nails/nails-details-handler');
const SchedulerHandler = require('../adapters/http/scheduler/scheduler-handler');
const AppointmentHandler = require('../adapters/http/appointment/appointment-handler');

// MiddleWares
const TokenMiddleWare = require('../adapters/http/middleware/authentication');

// Intance- repository
const userPrismaRepository = new UserPrismaRepository(prisma);
const typesNailsPrismaRepository = new TypesNailsPrismaRepository(prisma);
const nailsDetailsPrismaRepository = new NailsDetailsPrismaRepository(prisma);
const schedulerPrismaRepository = new SchedulerPrismaRepository(prisma);
const appointmentPrismaRepository = new AppointmentPrismaRepository(prisma);

// Intance- usecases
const typesNailsUseCases = new TypesNailsUseCases(typesNailsPrismaRepository);
const nailsDetailsUseCases = new NailsDetailsUseCases(
  nailsDetailsPrismaRepository,
);
const schedulerUseCases = new SchedulerUseCases(schedulerPrismaRepository);
const appointmentUseCases = new AppointmentUseCases(
  appointmentPrismaRepository,
  userPrismaRepository,
  typesNailsPrismaRepository,
  nailsDetailsPrismaRepository,
  schedulerUseCases,
);
const tokenUsescases = new TokenUsesCases(jwt);
const userUseCases = new UserUseCases(userPrismaRepository, tokenUsescases);
// Intance - Middlewares
const tokenMiddleWare = new TokenMiddleWare(tokenUsescases);

// Intance - Handler
const userHandler = new Userhandler(userUseCases);
const typesNailsHandler = new TypesNailsHandler(typesNailsUseCases);
const nailsDetailsHandler = new NailsDetailsHandler(nailsDetailsUseCases);
const schedulerHandler = new SchedulerHandler(schedulerUseCases);
const appointmentHandler = new AppointmentHandler(appointmentUseCases);

module.exports = {
  userHandler,
  typesNailsHandler,
  nailsDetailsHandler,
  schedulerHandler,
  appointmentHandler,
  tokenMiddleWare,
};
