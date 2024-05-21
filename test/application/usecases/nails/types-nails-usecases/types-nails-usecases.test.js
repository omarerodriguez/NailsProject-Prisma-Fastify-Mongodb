/**Repositories */
const TypesNailsPrismaRepository = require('../../../../../src/adapters/repositories/types-nails-prisma-repository');
/**UseCases */
const TypesNailsUseCases = require('../../../../../src/application/usecases/types-nails-usecases');
const DetailsNailsRedisUseCases = require('../../../../../src/application/usecases/redis/details-nails-redis-usecases');
const TypesNailsRedisUseCases = require('../../../../../src/application/usecases/redis/types-nails-redis-usecases');

/**BUILDER */
const builder = require('../../../../../src/application/usecases/builder/appointment/index');

/**MOCKS */
/**TYPESNIALS */
const mockRedisFindAllTypesNails = jest.fn();
const mockRedisFindTypesNailsById = jest.fn();
const mockRedisFindDetailsNails = jest.fn();

jest.mock(
  '../../../src/application/usecases/redis/types-nails-redis-usecases.js',
  () =>
    jest.fn().mockImplementation(() => ({
      redisFindAllTypesNails: mockRedisFindAllTypesNails,
      redisFindAllTypesNailsById: mockRedisFindTypesNailsById,
    })),
);
jest.mock(
  '../../../src/application/usecases/redis/details-nails-redis-usecases.js',
  () =>
    jest.fn().mockImplementation(() => ({
      redisFindAllDetailsNails: mockRedisFindDetailsNails,
    })),
);

describe('test in Types nails usecases', () => {
  let typesNailsUseCases;

  const typesNailsExpect = {
    id: '6625baa58bfe804de8e74139',
    name: 'Acrilicas',
    allowed_details_ids: [
      '6625b9e20f5138caa21d2c68',
      '6625c1850f5138caa21d2c74',
      '6625c1b80f5138caa21d2c77',
      '6625ba980f5138caa21d2c6a',
    ],
    allowed_details: [
      'Limpieza',
      'Black Imperial',
      'Rectangular',
      'Disfuminado',
    ],
    default_price: 500,
    duration: 2,
    deleted_at: null,
    created_at: '21/4/2024 20:17:25',
  };

  beforeAll(() => {
    /**Intances Repository */
    const typesNailsPrismaRepository = new TypesNailsPrismaRepository();
    /**Client */
    /**builder */
    /**Intances UseCase */
    const detailsNailsRedisUseCases = new DetailsNailsRedisUseCases();
    const typesNailsRedisUseCases = new TypesNailsRedisUseCases();
    typesNailsUseCases = new TypesNailsUseCases(
      typesNailsPrismaRepository,
      detailsNailsRedisUseCases,
      typesNailsRedisUseCases,
      builder,
    );
  });
  beforeEach(() => {
    jest.clearAllMocks();
    /**Initial Values */
    mockRedisFindAllTypesNails.mockResolvedValue([
      [
        {
          id: '6625baa58bfe804de8e74139',
          name: 'Acrilicas',
          allowed_details_ids: [
            '6625b9e20f5138caa21d2c68',
            '6625c1850f5138caa21d2c74',
            '6625c1b80f5138caa21d2c77',
            '6625ba980f5138caa21d2c6a',
          ],
          allowed_details: [
            'Limpieza',
            'Black Imperial',
            'Rectangular',
            'Disfuminado',
          ],
          default_price: 500,
          duration: 2,
          deleted_at: null,
          created_at: '21/4/2024 20:17:25',
        },
        {
          id: '6625bb0b8bfe804de8e7413a',
          name: 'Semipermanente',
          allowed_details_ids: [
            '6625c1640f5138caa21d2c73',
            '6625c20a94d28a4866c96335',
            '6625c1b80f5138caa21d2c77',
          ],
          allowed_details: ['Retiro', 'Disfuminado', 'Larga XL'],
          default_price: 300,
          duration: 2,
          deleted_at: '21/4/2024 20:19:07',
          created_at: '21/4/2024 20:19:07',
        },
      ],
      null,
    ]);
    mockRedisFindTypesNailsById.mockResolvedValue([typesNailsExpect, null]);
    mockRedisFindDetailsNails.mockResolvedValue([
      [
        {
          id: '6619be85ff54995d2bf38ab5',
          name: 'test5',
          price: 200000,
          duration: 1,
          deleted_at: null,
          created_at: '12/4/2024 23:06:45',
        },
        {
          id: '6625c1b80f5138caa21d2c77',
          name: 'Disfuminado',
          price: 62,
          duration: 1,
          deleted_at: null,
          created_at: '22/4/2024 1:47:36',
        },
        {
          id: '6625c1ce0f5138caa21d2c78',
          name: 'Encapsulado',
          price: 75,
          duration: 1,
          deleted_at: null,
          created_at: '22/4/2024 1:47:58',
        },
        {
          id: '6625c20a94d28a4866c96335',
          name: 'Larga XL',
          price: 72,
          duration: 1,
          deleted_at: null,
          created_at: '21/4/2024 20:48:58',
        },
        {
          id: '6632c4f286bd9ecce76e30aa',
          name: 'test5',
          price: 123,
          duration: 5,
          deleted_at: null,
          created_at: '1/5/2024 22:40:50',
        },
      ],
      null,
    ]);
  });

  test('filter all types if user is not admin', async () => {
    const role = 'USER';
    const [typesNails, status, error] =
      await typesNailsUseCases.findAllTypesNails(role);
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(typesNails[0].deleted_at).toBeNull();
  });

  test('filter all types if user is not admin, received empty array', async () => {
    mockRedisFindAllTypesNails.mockResolvedValue([
      [
        {
          id: '6625baa58bfe804de8e74139',
          name: 'Acrilicas',
          allowed_details_ids: [
            '6625b9e20f5138caa21d2c68',
            '6625c1850f5138caa21d2c74',
            '6625c1b80f5138caa21d2c77',
            '6625ba980f5138caa21d2c6a',
          ],
          allowed_details: [
            'Limpieza',
            'Black Imperial',
            'Rectangular',
            'Disfuminado',
          ],
          default_price: 500,
          duration: 2,
          deleted_at: '21/4/2024 20:17:25',
          created_at: '21/4/2024 20:17:25',
        },
        {
          id: '6625bb0b8bfe804de8e7413a',
          name: 'Semipermanente',
          allowed_details_ids: [
            '6625c1640f5138caa21d2c73',
            '6625c20a94d28a4866c96335',
            '6625c1b80f5138caa21d2c77',
          ],
          allowed_details: ['Retiro', 'Disfuminado', 'Larga XL'],
          default_price: 300,
          duration: 2,
          deleted_at: '21/4/2024 20:19:07',
          created_at: '21/4/2024 20:19:07',
        },
      ],
      null,
    ]);
    const role = 'USER';
    const [typesNails, status, error] =
      await typesNailsUseCases.findAllTypesNails(role);
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(typesNails).toStrictEqual([]);
  });
});
