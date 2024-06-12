const jwt = require('jsonwebtoken');
/** TokenUseCases */
const TokenUseCases = require('../../../../src/application/usecases/token-usecases');

describe('generateToken function', () => {
  let tokenUseCases;
  beforeAll(() => {
    /**Intances UseCase */
    tokenUseCases = new TokenUseCases(jwt);
  });
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(jwt, 'sign').mockResolvedValue('fake_token');
    //jest.fn(process.env.JWT_SECRET_KEY).mockResolvedValue('fake_secret_key');
    jest.spyOn(jwt, 'verify').mockImplementation((token, secret) => {
      if (token === 'valid_admin_token') {
        return { userId: '659936dc6a1d92adb561073ex', role: 'ADMIN' };
      } else if (token === 'user_token') {
        return { userId: '659936dc6a1d92adb561072ex', role: 'USER' };
      } else if (token === 'expired_token') {
        throw new jwt.TokenExpiredError('Token has expired');
      } else {
        throw new Error('Invalid token');
      }
    });
  });

  /**GENERATE TOKEN TEST */
  test('should generate a valid token', async () => {
    process.env.JWT_SECRET_KEY = 'fake_secret_key';
    const userId = '659936dc6a1d92adb561073ex';
    const role = 'ADMIN';
    const [token, error] = await tokenUseCases.generateToken(userId, role);

    expect(token).toBe('fake_token');
    expect(error).toBeNull();
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId, role },
      process.env.JWT_SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: '60d',
      },
    );
  });

  test('should return an error when userId is empty', async () => {
    const [token, error] = await tokenUseCases.generateToken(null, 'admin');

    expect(token).toBeNull();
    expect(error).toBe('empty data not allow');
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  /**VERIFY ROLE TEST */

  test('should verify a valid token with correct role', async () => {
    const token = 'valid_admin_token';
    const role = ['ADMIN'];
    const [decodedToken, status, error] = await tokenUseCases.verifyToken(
      token,
      role,
    );

    expect(decodedToken).toEqual({
      userId: '659936dc6a1d92adb561073ex',
      role: 'ADMIN',
    });
    expect(status).toBe(200);
    expect(error).toBeNull();
  });

  test('should verify a valid token with incorrect role', async () => {
    const token = 'user_token';
    const role = ['ADMIN'];
    const [decodedToken, status, error] = await tokenUseCases.verifyToken(
      token,
      role,
    );

    expect(decodedToken).toBeNull();
    expect(status).toBe(403);
    expect(error).toBe('Unauthorized');
  });
});
