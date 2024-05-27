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

  test('error if user image is invalid', async () => {
    request.body.user_img = 'fakeurl/jkbqbsjbjad';
    request.params.id = '6647708a7622abfb27ba078c';
    await userhandler.updateUser(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        user_img: ['el URL debe proveenir de cloudinary.'],
      },
    });
  });
});
