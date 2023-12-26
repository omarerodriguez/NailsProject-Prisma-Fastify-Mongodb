const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const {
  createNewUserRules,
  loginUserRules,
  createNewNailsTypesRules,
} = require('../const/input-rules');

const createNewuUserValidations = (newUserPayload) => {
  const validation = new Validator(newUserPayload, createNewUserRules);
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const loginUserValidations = (userPayload) => {
  const validation = new Validator(userPayload, loginUserRules);
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const validateToken = (req, res, done) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) res.send('Access denied');
  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err) => {
    if (err) res.send('Access denied, Token expired');
    else {
      done();
    }
  });
};

const createNewNailsTypesValidations = (newNailsTypesPayload) => {
  const validation = new Validator(
    newNailsTypesPayload,
    createNewNailsTypesRules,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};
module.exports = {
  createNewuUserValidations,
  validateToken,
  loginUserValidations,
  createNewNailsTypesValidations,
};
