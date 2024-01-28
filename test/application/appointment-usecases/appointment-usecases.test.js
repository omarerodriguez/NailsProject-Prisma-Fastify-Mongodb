/** Repositories */
const UserPrismaRepository = require('../../../src/adapters/repositories/user-prisma-repository');
const TypesNailsPrismaRepository = require('../../../src/adapters/repositories/nails-types-prisma-repository');
const DetailsTypesNailsPrismaRepository = require('../../../src/adapters/repositories/nails-details-prisma-repository');
const AppointmentPrismaRepository = require('../../../src/adapters/repositories/appointment-prisma-repository');
const SchedulerPrismaRepository = require('../../../src/adapters/repositories/scheduler-prisma-repository');


/** Usecases */
const AppointmentUseCases = require('../../../src/application/usecases/appointment-usecases');
const SchedulerUseCases = require('../../../src/application/usecases/scheduler-usecases');

const mockPrismaClient = {
  user: {
    findFirst: jest.fn().mockResolvedValue({
      id: '9659936dc6a1d92adb561073ex',
      name: 'Omar',
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: '9659916dc6a1d92adb561073ex',
      },
    ]),
  },
  nailType: {
    findFirst: jest.fn().mockResolvedValue({
      id: '659930a740333038004d25eb',
      name: 'acrilicas',
      default_price: 2000,
    }),
  },
  nailsDetails: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: '6599a50d9f1803f665b2e087',
        name: 'Sticker Estrella',
        price: 1500,
      },
      {
        id: '6599a50d9f1803f665b2e187',
        name: 'Sticker Fuego',
        price: 1300,
      },
    ]),
  },
  scheduler: {
    findFirst: jest.fn().mockResolvedValue({
      id: '9659936dc6a1d92adb561074',
      appointmets: {
        7: '659930a740333038004d25eb',
        8: '6599a50d9f1803f665b3e087',
      },
    }),
  },
  appointment: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: '6599a50d9f1803f665b3e087',
      },
    ]),
  },
};
/** Intances Repository */
const userPrismaRepository = new UserPrismaRepository(mockPrismaClient);
const typesNailsPrismaRepository = new TypesNailsPrismaRepository(
  mockPrismaClient,
);
const detailsTypesNailsPrismaRepository = new DetailsTypesNailsPrismaRepository(
  mockPrismaClient,
);
const appointmentPrismaRepository = new AppointmentPrismaRepository(
  mockPrismaClient,
);
const schedulerPrismaRepositry = new SchedulerPrismaRepository(
  mockPrismaClient
)

/** Intances useCases */
const schedulerUseCases = new SchedulerUseCases(
  schedulerPrismaRepositry,
);
const appointmentUseCases = new AppointmentUseCases(
  appointmentPrismaRepository,
  userPrismaRepository,
  typesNailsPrismaRepository,
  detailsTypesNailsPrismaRepository,
  schedulerUseCases,
);

describe('test in appointment usecases', () => {
  const appoinmentPayload = {
    user_id: '659936dc6a1d92adb561073ex',
    types_of_nails_id: '659930a740333038004d25eb',
    details_of_nails: ['6599a50d9f1803f665b2e087', '6599a50d9f1803f665b2e187'],
  };

  test('user dont exist', async () => {
    mockPrismaClient.user = {
      findFirst: jest.fn().mockResolvedValue(null),
    };

    const [user, status, error] =
      await appointmentUseCases.createNewAppointment(appoinmentPayload);
    expect(status).toEqual(404);
    expect(user).toBeNull();
    expect(error).toBe('user not found or not exist');
  });

  test('type of neils dont exist', async () => {
    mockPrismaClient.nailType = {
      findFirst: jest.fn().mockResolvedValue(null),
    };

    const [nailType, status] = await appointmentUseCases.createNewAppointment(
      appoinmentPayload,
    );
    expect(status).toEqual(404);
    expect(nailType).toBeNull();
  });

  test('details of neils dont exist', async () => {
    mockPrismaClient.nailsDetails = {
      findMany: jest.fn().mockResolvedValue([]),
    };

    const [detailOfNails, status] =
      await appointmentUseCases.createNewAppointment(appoinmentPayload);
    expect(status).toEqual(404);
    expect(detailOfNails).toBeNull();
  });

  test('scheduler of neils dont exist or not found', async () => {
    mockPrismaClient.scheduler = {
      findFirst: jest.fn().mockResolvedValue(null),
    };
    const [user, status] = await appointmentUseCases.createNewAppointment(
      appoinmentPayload,
    );
    expect(status).toEqual(404);
    expect(user).toBeNull();
  });

  test('Appointment exist in the same day ', async () => {
    const [, status, error] = await appointmentUseCases.createNewAppointment(
      appoinmentPayload,
    );
    expect(status).toEqual(400);
    expect(error).toBe('Ya tiene una cita agendada para el dia de hoy, solo puede tener una cita por dia')
  });

});
