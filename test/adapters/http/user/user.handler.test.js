// repositories
const UserUseCases = require('../../../../src/application/usecases/user-usecases');
const Userhandler = require('../../../../src/adapters/http/user/user-handler');

const mockUpdateUser = jest.fn();
jest.mock('../../../../src/application/usecases/user-usecases', () =>
  jest.fn().mockImplementation(() => ({
    updateUser: mockUpdateUser,
  })),
);

describe('test in user handler', () => {
  let request = {};

  let userUseCases;
  let userhandler;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeAll(() => {
    userUseCases = new UserUseCases();
    userhandler = new Userhandler(userUseCases);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdateUser.mockResolvedValue([
      {
        name: 'santiago',
        phone_number: '3044585631',
        email: 'test1@test.com',
        user_img: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      },
      200,
      null,
    ]);
    request.body = {};
    request.params = {};
  });
});
