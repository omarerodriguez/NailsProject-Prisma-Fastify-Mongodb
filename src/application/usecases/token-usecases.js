const jwt = require('jsonwebtoken');

module.exports = class TokenUsesCases {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  GenerateToken = async (uid) => {
    const expiresIn = 60 * 15;
    function createToken(uid) {
      if (!uid) return [null, 404, 'empty data not allow'];
      return jwt.sign({ uid }, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn,
      });
    }
    console.log(`time:${expiresIn}s`);
    const token = createToken(uid);
    // console.log(typeof (token));
    return [token, 200, null];
  };

  verifyToken = async (token) => {
    function authToken(token) {
      if (!token) return [null, 404, 'Invalid token'];
      return jwt.verify(
        JSON.stringify(token),
        process.env.JWT_SECRET_KEY,
        (err) => [err, 403, 'Failed to authenticate token.'],
      );
    }
    const tokenVerify = authToken(token);
    //console.log(typeof tokenVerify);
    return [tokenVerify, 200, null];
  };
};
