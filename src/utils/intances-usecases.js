// imports -clients
const prisma = require('../infraestructura/prisma/prismaConfig');
const jwt = require('jsonwebtoken');

// Repositories
const UserPrismaRepository = require('../adapters/repositories/user-prisma-repository');
const TypesNailsPrismaRepository = require('../adapters/repositories/types-nails-prisma-repository');
const DetailsNailsPrismaRepository = require('../adapters/repositories/details-nails-prisma-repository.js');
const SchedulerPrismaRepository = require('../adapters/repositories/scheduler-prisma-repository');
const AppointmentPrismaRepository = require('../adapters/repositories/appointment-prisma-repository');

// Usecases
const UserUseCases = require('../application/usecases/user-usecases');
const TokenUsesCases = require('../application/usecases/token-usecases');
const TypesNailsUseCases = require('../application/usecases/types-nails-usecases.js');
const DetailsNailsUseCases = require('../application/usecases/nails-details-usecases.js');
const SchedulerUseCases = require('../application/usecases/scheduler-usecases');
const AppointmentUseCases = require('../application/usecases/appointment-usecases');

// Handlers
const Userhandler = require('../adapters/http/user/user-handler');
const TypesNailsHandler = require('../adapters/http/nails/types-nails-handler');
const DetailsNailsHandler = require('../adapters/http/nails/details-nails-handler.js');
const SchedulerHandler = require('../adapters/http/scheduler/scheduler-handler');
const AppointmentHandler = require('../adapters/http/appointment/appointment-handler');

// MiddleWares
const TokenMiddleWare = require('../adapters/http/middleware/authentication');

// Intance- repository
const userPrismaRepository = new UserPrismaRepository(prisma);
const typesNailsPrismaRepository = new TypesNailsPrismaRepository(prisma);
const detailsNailsPrismaRepository = new DetailsNailsPrismaRepository(prisma);
const schedulerPrismaRepository = new SchedulerPrismaRepository(prisma);
const appointmentPrismaRepository = new AppointmentPrismaRepository(prisma);

// Intance- usecases
const typesNailsUseCases = new TypesNailsUseCases(typesNailsPrismaRepository);
const detailsNailsUseCases = new DetailsNailsUseCases(
  detailsNailsPrismaRepository,
);
const schedulerUseCases = new SchedulerUseCases(schedulerPrismaRepository);
const appointmentUseCases = new AppointmentUseCases(
  appointmentPrismaRepository,
  userPrismaRepository,
  typesNailsPrismaRepository,
  detailsNailsPrismaRepository,
  schedulerUseCases,
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
