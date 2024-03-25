const {
  extractTokenToHeader,
} = require('../../../utils/functions/token-function');
module.exports = class TokenMiddleware {
  constructor(tokenUsecases) {
    this.tokenUsecases = tokenUsecases;
    this.token = null;
  }

  verifyAdminToken = (req, res, next) => {
    const errorSetToken = this.setToken(req, res);
    if (errorSetToken) return errorSetToken;
    const [decodedToken, status, errToken] = this.tokenUsecases.verifyToken(this.token, [
      'ADMIN',
    ]);
    if (errToken) {
      return res.status(status).send({
        message: 'fail',
        errors: errToken,
      });
    }
    next();
  };

  verifyUserToken = (req, res, next) => {
    const errorSetToken = this.setToken(req, res);
    if (errorSetToken) return errorSetToken;
    const [decodedToken, status, errToken] = this.tokenUsecases.verifyToken(this.token, [
      'ADMIN',
      'USER',
    ]);
    res.locals = {decodedToken};
    if (errToken)
      return res.status(status).send({
        message: 'fail',
        errors: errToken,
      });
    next();
  };

  setToken = (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({
        message: 'fail',
        errors: 'Metodo de autenticacion invalido',
      });
      return res;
    }
    this.token = extractTokenToHeader(token);
  };
};
