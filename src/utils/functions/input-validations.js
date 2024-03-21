const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const {
  createNewUserRules,
  loginUserRules,
  createNewTypesNailsRules,
  createNewDetailsNailsRules,
  getSchedulerByDateRules,
  getUserByIdRules,
  createNewAppointmentRules,
} = require('../const/input-rules');
const {
  customMessagesCreateUser,
  customMessagesCreateNailsTypes,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
  customMessagesCreateNewAppointment,
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

const createNewTypesNailsValidations = (newNailsTypesPayload) => {
  const validation = new Validator(
    newNailsTypesPayload,
    createNewTypesNailsRules,
    customMessagesCreateNailsTypes,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const createNewDetailsNailsValidations = (newDetailsNailsPayload) => {
  const validation = new Validator(
    newDetailsNailsPayload,
    createNewDetailsNailsRules,
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

const createNewAppointmentValidations = (appointmentPayload) => {
  const validation = new Validator(
    appointmentPayload,
    createNewAppointmentRules,
    customMessagesCreateNewAppointment,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};
module.exports = {
  createNewuUserValidations,
  validateToken,
  loginUserValidations,
  createNewTypesNailsValidations,
  createNewDetailsNailsValidations,
  getSchedulerByDateValidations,
  getUserByIdValidations,
  createNewAppointmentValidations,
};
