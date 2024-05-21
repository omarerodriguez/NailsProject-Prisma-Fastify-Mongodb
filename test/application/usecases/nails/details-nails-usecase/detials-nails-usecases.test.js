/**Repositories */
const DetailsNailsPrismaRepository = require('../../../../../src/adapters/repositories/details-nails-prisma-repository');
/**UseCases */
const DetailsNailsUseCases = require('../../../../../src/application/usecases/details-nails-usecases');
const DetailsNailsRedisUseCases = require('../../../../../src/application/usecases/redis/details-nails-redis-usecases');

/**MOCKS */
/**TYPESNIALS */
const mockRedisFindDetailsNails = jest.fn();

  jest.mock(
    '../../../../../src/application/usecases/redis/details-nails-redis-usecases.js',
    () =>
      jest.fn().mockImplementation(() => ({
        redisFindAllDetailsNails: mockRedisFindDetailsNails,
      })),
  );

  describe('test in Details nails usecases', () => {
    let detailsNailsUseCases;
  
    beforeAll(() => {
      /**Intances Repository */
      const detailsNailsPrismaRepository = new DetailsNailsPrismaRepository();
      /**Intances UseCase */
      const detailsNailsRedisUseCases = new DetailsNailsRedisUseCases();
      detailsNailsUseCases = new DetailsNailsUseCases(
        detailsNailsPrismaRepository,
        detailsNailsRedisUseCases,
      );
    });
    beforeEach(() => {
      jest.clearAllMocks();
      /**Initial Values */
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
  
    test('filter all details if user is not admin', async () => {
      const role = 'USER';
      const [detailsNails, status, error] =
        await detailsNailsUseCases.findAllDetailsNails(role);
      expect(status).toBe(200);
      expect(error).toBeNull();
      expect(detailsNails[0].deleted_at).toBeNull();
    });
  
    test('filter all details if user is not admin, received empty array', async () => {
        mockRedisFindDetailsNails.mockResolvedValue([
        [
            {
                id: '6625c1b80f5138caa21d2c77',
                name: 'Disfuminado',
                price: 62,
                duration: 1,
                deleted_at: '22/4/2024 1:47:36',
                created_at: '22/4/2024 1:47:36',
              },
              {
                id: '6625c1ce0f5138caa21d2c78',
                name: 'Encapsulado',
                price: 75,
                duration: 1,
                deleted_at: '22/4/2024 1:47:58',
                created_at: '22/4/2024 1:47:58',
              },
              {
                id: '6625c20a94d28a4866c96335',
                name: 'Larga XL',
                price: 72,
                duration: 1,
                deleted_at:  '21/4/2024 20:48:58',
                created_at: '21/4/2024 20:48:58',
              },
              {
                id: '6632c4f286bd9ecce76e30aa',
                name: 'test5',
                price: 123,
                duration: 5,
                deleted_at: '1/5/2024 22:40:50',
                created_at: '1/5/2024 22:40:50',
              } 
        ],
        null,
      ]);
      const role = 'USER';
      const [detailsNails, status, error] =
        await detailsNailsUseCases.findAllDetailsNails(role);
      expect(status).toBe(200);
      expect(error).toBeNull();
      expect(detailsNails).toStrictEqual([]);
    });
  });
  