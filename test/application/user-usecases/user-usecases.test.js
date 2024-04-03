/**Repositories */
const UserPrismaRepository = require('../../../src/adapters/repositories/user-prisma-repository');
/**UseCases */
const UserUseCases = require('../../../src/application/usecases/user-usecases');

/**MOCKS */
/**USER */
const mockFindAllUser = jest.fn();
const mockFindUserById = jest.fn();
const mockCreateUser = jest.fn();
const mockDeleteUser = jest.fn();
const mockFindUserByEmail = jest.fn();
const mockFindUserByPhone = jest.fn();

jest.mock('../../../src/adapters/repositories/user-prisma-repository', () =>
  jest.fn().mockImplementation(() => ({
    findAllUser: mockFindAllUser,
    findUserById: mockFindUserById,
    createNewUser: mockCreateUser,
    deleteUser: mockDeleteUser,
    findUserByEmail: mockFindUserByEmail,
    findUserByPhoneNumber: mockFindUserByPhone,
  })),
);

describe('test in User usecases', () => {
  let userUseCases;
  let userPayload;

  const userExpect = {
    id: '65c263a0ad14bfde56c062c3',
    name: 'duvi',
    last_name: 'rodriguez',
    age: 21,
    phone_number: '3000655000',
    district: 'Portal de san antonio',
    gender: 'masculino',
    email: 'duvandavidrodriguezm@gmail.com',
    role: 'ADMIN',
    created_at: '6/2/2024 20:51:44',
  };
  beforeAll(() => {
    /**Intances Repository */
    const userPrismaRepository = new UserPrismaRepository();
    /**Intances UseCase */
    userUseCases = new UserUseCases(userPrismaRepository);

    userPayload = {
      name: 'omar',
      last_name: 'rodriguez',
      age: 21,
      phone_number: '3002691428',
      district: 'Portal de san antonio',
      gender: 'masculino',
      role: 'USER',
      email: 'omarmr7214@gmail.com',
    };
  });
  beforeEach(() => {
    jest.clearAllMocks();
    /**Initial Values */
    mockFindAllUser.mockResolvedValue([
      {
        id: '65c263a0ad14bfde56c062c3',
        name: 'duvi',
        last_name: 'rodriguez',
        age: 21,
        phone_number: '3000655000',
        district: 'Portal de san antonio',
        gender: 'masculino',
        email: 'duvandavidrodriguezm@gmail.com',
        role: 'ADMIN',
        created_at: '6/2/2024 20:51:44',
      },
      {
        id: '65cb8aba310825ecbd3832ef',
        name: 'duvan',
        last_name: 'rodriguez',
        age: 21,
        phone_number: '3000655001',
        district: 'Portal de san antonio',
        gender: 'masculino',
        email: 'duvandavidrodriguezma@gmail.com',
        role: 'USER',
        created_at: '13/2/2024 19:28:58',
      },
    ]);
  });
  mockFindUserById.mockResolvedValue([userExpect,null]);
  mockFindUserByEmail.mockResolvedValue([userExpect,null]);
  mockFindUserByPhone.mockResolvedValue([userExpect,null]);

  mockCreateUser.mockResolvedValue([
    {
      name: 'omar',
      last_name: 'rodriguez',
      age: 21,
      phone_number: '3002691428',
      district: 'Portal de san antonio',
      gender: 'masculino',
      role: 'USER',
      email: 'omarmr7214@gmail.com',
    },
    null,
  ]);
  mockDeleteUser.mockResolvedValue([
    {
      id: '65c263a0ad14bfde56c062c3',
    },
  ]);

  test('create new user but email already exist', async () => {
    const [user, status, error] = await userUseCases.createNewUser(userPayload);
    expect(status).toBe(400);
    expect(error).toBe('Email already exist');
    expect(user).toBeNull();
  });

  test('create new user but phone number already exist', async () => {
    mockFindUserByEmail.mockResolvedValue([null, true]);
    const [, status, error] = await userUseCases.createNewUser(userPayload);
    expect(status).toBe(400);
    expect(error).toBe('Phone number already exist');
  });

  test('find user by id', async () => {
    const expectedUserId = '65c263a0ad14bfde56c062c3';
    const [user, status, error] = await userUseCases.findUserById(
      expectedUserId,
    );
    expect(status).toBe(200);
    expect(error).toBeNull();
    expect(user).toEqual(userExpect);
  });
});
