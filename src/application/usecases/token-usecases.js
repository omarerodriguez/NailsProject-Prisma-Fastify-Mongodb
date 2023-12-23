const jwt = require('jsonwebtoken');

module.exports = class TokenUsesCases {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  // eslint-disable-next-line class-methods-use-this
  generateToken = async (userId) => {
    try {
      const expiresIn = 60 * 15;

      if (!userId) return [null, 'empty data not allow'];
      const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn,
      });

      return [token, null];
    } catch (error) {
      return [null, error.message];
    }
  };

  // eslint-disable-next-line class-methods-use-this
  verifyToken = async (token) => {
    if (!token) return [null, 404, 'Invalid token'];

    const tokenVerify = jwt.verify(
      JSON.stringify(token),
      process.env.JWT_SECRET_KEY,
      (err) => [err, 403, 'Failed to authenticate token.'],
    );

    return [tokenVerify, 200, null];
  };
};
