const UserPrismaRepository = require('../../../src/adapters/repositories/user-prisma-repository');
const AppointmentUseCases = require('../../../src/application/usecases/appointment-usecases');
const TypesNailsPrismaRepository = require('../../../src/adapters/repositories/nails-types-prisma-repository');
const DetailsTypesNailsPrismaRepository = require('../../../src/adapters/repositories/nails-details-prisma-repository');
const AppointmentPrismaRepository = require('../../../src/adapters/repositories/appointment-prisma-repository');

const mockPrismaClient = {
  user: {
    findFirst: jest.fn().mockResolvedValue({}),
  },
  nailType: {
    findFirst: jest.fn().mockResolvedValue({
      id: '659930a740333038004d25eb',
      name: 'acrilicas',
      default_price: 2000,
    }),
  },
  nailsDetails: {
    findMany: jest.fn().mockResolvedValue({
      id: '6599a50d9f1803f665b2e087',
      name: 'Sticker Estrella',
      price: 1500,
    }),
  },
};
describe('test in appointment usecases', () => {
  test('user dont exist', async () => {
    mockPrismaClient.user = {
      findFirst: jest.fn().mockResolvedValue(null),
    };
    const userPrismaRepository = new UserPrismaRepository(mockPrismaClient);
    const typesNailsPrismaRepository = new TypesNailsPrismaRepository(
      mockPrismaClient,
    );
    const detailsTypesNailsPrismaRepository =
      new DetailsTypesNailsPrismaRepository(mockPrismaClient);
    const appointmentPrismaRepository = new AppointmentPrismaRepository(
      mockPrismaClient,
    );
    const appointmentUseCases = new AppointmentUseCases(
      appointmentPrismaRepository,
      userPrismaRepository,
      typesNailsPrismaRepository,
      detailsTypesNailsPrismaRepository,
    );
    const [user, status, error] =
      await appointmentUseCases.createNewAppointment({
        user_id: '659936dc6a1d92adb561073ex',
        types_of_nails_id: '659930a740333038004d25eb',
        details_of_nails: [1, 2],
      });
    expect(status).toEqual(404);
    expect(user).toBeNull();
    expect(error).toBe('user not found or not exist');
  });
});
