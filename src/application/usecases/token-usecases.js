const { verifyScopesByRole } = require('../../utils/functions/token-function');

module.exports = class TokenUsesCases {
  constructor(jwt) {
    this.jwt = jwt;
  }

  generateToken = async (userId, role) => {
    try {
      const expiresIn = 60 * 60 * 24 * 60;

      if (!userId) return [null, 'empty data not allow'];
      const token = await this.jwt.sign(
        { userId, role },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: 'HS256',
          expiresIn,
        },
      );
      return [token, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  verifyToken = (token, roles) => {
    try {
      if (!token) return [null, 401, 'Token not provided'];

      const decodedToken = this.jwt.verify(token, process.env.JWT_SECRET_KEY);

      const isAuthorized = verifyScopesByRole(decodedToken.role, roles);
      if (!isAuthorized) return [null, 403, 'Unauthorized'];

      return [decodedToken, 200, null];
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return [null, 401, 'Token has expired'];
      }
      console.log(err);
    }
    return [null, 403, 'Invalid token.'];
  };
};
