const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const {
  createNewUserRules,
  loginUserRules,
  createNewTypesNailsRules,
  updateTypesNailsRules,
  createNewDetailsNailsRules,
  getSchedulerByDateRules,
  getUserByIdRules,
  createNewAppointmentRules,
  updateAppointmentRules,
  updateDetailsNailsRules,
  updateUserRules,
} = require('../const/input-rules');

const {
  customMessagesUser,
  customMessagesCreateTypesNails,
  customMessagesUpdateTypesNails,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
  customMessagesAppointment,
  customMessagesUpdateDetailsNails,
} = require('./../const/custom-messages');

const createNewuUserValidations = (newUserPayload) => {
  const validation = new Validator(
    newUserPayload,
    createNewUserRules,
    customMessagesUser,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const updateUserValidations = (updateUserPayload) => {
  const validation = new Validator(
    updateUserPayload,
    updateUserRules,
    customMessagesUser,
  );
  const errors = validation.errors.all();
  if (!validation.fails()) {
    const cloudinaryUrlPattern =
      /^https?:\/\/(?:res|cloudinary)\.cloudinary\.com\/.*$/;
    if (!cloudinaryUrlPattern.test(updateUserPayload.user_img)) {
      errors.user_img = ['el URL debe proveenir de cloudinary.'];
    }
  }
  if (Object.keys(errors).length) return errors;
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
    customMessagesCreateTypesNails,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const updateTypesNailsValidations = (updateNailsTypesPayload) => {
  const validation = new Validator(
    updateNailsTypesPayload,
    updateTypesNailsRules,
    customMessagesUpdateTypesNails,
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

const updateDetailsNailsValidations = (updateDetailsNailsPayload) => {
  const validation = new Validator(
    updateDetailsNailsPayload,
    updateDetailsNailsRules,
    customMessagesUpdateDetailsNails,
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
    customMessagesAppointment,
  );
  const errors = validation.errors.all();
  if (validation.fails()) return errors;
  return null;
};

const updateAppointmentValidations = (appointmentPayload) => {
  const validation = new Validator(
    appointmentPayload,
    updateAppointmentRules,
    customMessagesAppointment,
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
  updateAppointmentValidations,
  updateTypesNailsValidations,
  updateDetailsNailsValidations,
  updateUserValidations,
};
