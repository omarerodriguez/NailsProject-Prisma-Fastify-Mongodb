const TokentMiddleware = require('../../../../src/adapters/http/middleware/authentication');
const TokenUseCases = require('../../../../src/application/usecases/token-usecases');

describe('test response verifyRole in authentication', () => {
  let tokenUseCases;
  let tokenMiddleware;
  let mockReq;
  let mockRes;
  const mockNext = jest.fn();
  beforeAll(() => {
    /**Intances UseCase */
    tokenUseCases = new TokenUseCases();
    tokenMiddleware = new TokentMiddleware(tokenUseCases);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(tokenUseCases, 'verifyToken').mockReturnValue([{}, 200, null]);

    mockReq = {
      headers: {
        Authorization: 'Bearer elTokenDeAdministrador',
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
  });
});
