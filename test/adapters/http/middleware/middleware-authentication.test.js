const TokentMiddleware = require('../../../../src/adapters/http/middleware/authentication');
const TokenUseCases = require('../../../../src/application/usecases/token-usecases');

describe('test response verifyRole in authentication', () => {
  let tokenUseCases;
  let tokenMiddleware;
  let mockReq;
  let mockRes;
  let decodedToken;
  const mockNext = jest.fn();
  beforeAll(() => {
    decodedToken = {
      "userId": "65bd4687f3e0eb8ef8fe6ae4",
      "role": "ADMIN",
      "iat": 1711401689,
      "exp": 1711402589
    }
    /**Intances UseCase */
    tokenUseCases = new TokenUseCases();
    tokenMiddleware = new TokentMiddleware(tokenUseCases);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(tokenUseCases, 'verifyToken').mockReturnValue([decodedToken, 200, null]);

    mockReq = {
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWJkNDY4N2YzZTBlYjhlZjhmZTZhZTQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTE0MDE2ODksImV4cCI6MTcxMTQwMjU4OX0.SbuIE1p_tgTFMHVy_zPLrdilE55LeHZGCM3Ro6u6em4',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test('should call next if token is valid for admin', () => {
    tokenMiddleware.verifyAdminToken(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
/*
  test('should return error if token is empty', () => {
    delete mockReq.headers.Authorization;

    tokenMiddleware.verifyAdminToken(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith({
      message: 'fail',
      errors: 'Metodo de autenticacion invalido',
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return error if token usecases failed ', () => {
    jest
      .spyOn(tokenUseCases, 'verifyToken')
      .mockReturnValue([null, 401, 'Token error']);

    tokenMiddleware.verifyAdminToken(mockReq, mockRes, mockNext);
    expect(mockRes.status).not.toHaveBeenCalledWith(200);
    expect(mockRes.send.errors).toBeUndefined();
    expect(mockNext).not.toHaveBeenCalled();
  });*/
});
