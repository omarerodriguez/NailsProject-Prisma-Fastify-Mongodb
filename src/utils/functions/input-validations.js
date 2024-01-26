const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const {
  createNewUserRules,
  loginUserRules,
  createNewNailsTypesRules,
  createNewNailsDetailsRules,
  getSchedulerByDateRules,
  getUserByIdRules,
} = require('../const/input-rules');
const {
  customMessagesCreateUser,
  customMessagesCreateNailsTypes,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
} = require('./../const/custom-messages');

const createNewuUserValidations = (newUserPayload) => {
  const validation = new Validator(
    newUserPayload,
    createNewUserRules,
    customMessagesCreateUser,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const loginUserValidations = (userPayload) => {
  const validation = new Validator(
    userPayload,
    loginUserRules,
    customMessagesLoginUser,
  );
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
    customMessagesCreateNailsTypes,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const createNewNailsDetailsValidations = (newNailsDetailsPayload) => {
  const validation = new Validator(
    newNailsDetailsPayload,
    createNewNailsDetailsRules,
    customMessagesCreateDetailsNails,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const getSchedulerByDateValidations = (filters) => {
  const validation = new Validator(filters, getSchedulerByDateRules);
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const getUserByIdValidations = (filters) => {
  const validation = new Validator(filters, getUserByIdRules);
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};
module.exports = {
  createNewuUserValidations,
  validateToken,
  loginUserValidations,
  createNewNailsTypesValidations,
  createNewNailsDetailsValidations,
  getSchedulerByDateValidations,
  getUserByIdValidations,
};
