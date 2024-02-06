const {
  extractTokenToHeader,
} = require('../../../utils/functions/token-funtion');

module.exports = class TokentMiddleware {
  constructor(tokenUsecases) {
    this.tokenUsecases = tokenUsecases;
  }

  verifyAdminToken = (req, res, next) => {
    const [, status, errToken] = this.tokenUsecases.verifyToken(
      extractTokenToHeader(req),
      'ADMIN',
    );
    if (errToken) {
      return res.status(status).send({
        message: 'fail',
        errors: errToken,
      });
    }
    next();
  };

  verifyUserToken = (req, res, next) => {
    const [, status, errToken] = this.tokenUsecases.verifyToken(
      extractTokenToHeader(req),
      'USER',
    );
    if (errToken)
      return res.status(status).send({
        message: 'fail',
        errors: errToken,
      });
    next();
  };
};