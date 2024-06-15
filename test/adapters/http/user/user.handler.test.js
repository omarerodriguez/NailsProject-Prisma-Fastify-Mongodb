// repositories
const UserUseCases = require('../../../../src/application/usecases/user-usecases');
const TokenUseCases = require('../../../../src/application/usecases/token-usecases');
//handler
const Userhandler = require('../../../../src/adapters/http/user/user-handler');

//MOCKS
const mockUpdateUser = jest.fn();
const mockRefreshToken = jest.fn();
const mockDecodedToken = jest.fn();

jest.mock('../../../../src/application/usecases/token-usecases.js', () =>
  jest.fn().mockImplementation(() => ({
    decodedToken: mockDecodedToken,
  })),
);
jest.mock('../../../../src/application/usecases/user-usecases', () =>
  jest.fn().mockImplementation(() => ({
    updateUser: mockUpdateUser,
    refreshToken: mockRefreshToken,
  })),
);

describe('test in user handler', () => {
  let request = {};

  let userUseCases;
  let userhandler;
  let tokenUseCases;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeAll(() => {
    userUseCases = new UserUseCases();
    tokenUseCases = new TokenUseCases();
    userhandler = new Userhandler(userUseCases, tokenUseCases);
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
    mockRes.locals = {
      decodedToken: {
        userId: '65bf883876e16c781ec9646b',
        role: 'ADMIN',
        iat: 1716246144,
        exp: 1721430144,
      },
    };
  });

  test('should return 400 if no decodedToken is present', async () => {
    mockRes.locals.decodedToken = null;
    await userhandler.updateUser(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenLastCalledWith({
      message: 'fail',
      errors: 'TokenBody is required',
    });
  });

  test('should return 400 if validation fails', async () => {
    request.body = {};
    await userhandler.createNewUser(request, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: {
        name: ['El campo es obligatorio.'],
        phone_number: ['El campo es obligatorio.'],
        email: ['El campo es obligatorio'],
      },
    });
  });

  test('It should return an error if the phone number field is not sent', async () => {
    request.body.phone_number = '';
    request.body.email = 'omarmr7214@gmail.com';
    await userhandler.loginUser(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenLastCalledWith({
      message: 'fail',
      errors: {
        phone_number: ['El campo es obligatorio.'],
      },
    });
  });

  test('It should return an error if the email field is not sent', async () => {
    request.body.phone_number = '3002691184';
    request.body.email = '';
    await userhandler.loginUser(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenLastCalledWith({
      message: 'fail',
      errors: {
        email: ['El campo es obligatorio'],
      },
    });
  });

  test('It should return an error if an invalid email is sent', async () => {
    request.body.phone_number = '3002691184';
    request.body.email = 'jorgecarvajal94gmailcom';
    await userhandler.loginUser(request, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenLastCalledWith({
      message: 'fail',
      errors: {
        email: ['El campo no es una dirección de correo electrónico válida.'],
      },
    });
  });

  test('should return the new token and exp_date on success', async () => {
    const newToken = 'newtoken';
    const decodedToken = { iat: 1716865974 };

    request.body.token = 'old-token';
    mockRefreshToken.mockResolvedValue([newToken, null]);
    mockDecodedToken.mockReturnValue(decodedToken);

    await userhandler.refreshToken(request, mockRes);

    expect(mockRes.status).not.toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({
      token: newToken,
      exp_date: expect.any(String),
    });
  });
});
