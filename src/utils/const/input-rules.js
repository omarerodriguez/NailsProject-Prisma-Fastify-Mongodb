const createNewUserRules = {
  name: 'string|between:3,15|required',
  last_name: 'string|between:3,15',
  age: 'integer',
  phone_number: 'string|size:10|required',
  district: 'string|max:40',
  gender: 'string|min:5|max:9',
  email: 'required|email',
};

const loginUserRules = {
  phone_number: 'string|size:10|required',
  email: 'required|email',
};

const createNewNailsTypesRules = {
  name: 'string|between:4,25|required',
  default_price: 'integer|between:500,10000000',
  'allowed_detalis.*.name': 'string|min:3|max:25',
  'allowed_detalis.*.price': 'integer',
};

const createNewNailsDetailsRules = {
  name: 'string|between:4,25|required',
  price: 'integer|between:500,10000000',
};

const getSchedulerByDateRules = {
  date_type: 'string|in:week,half_month,month',
  date_to: 'date',
  date_from: 'date',
};

const getUserByIdRules = {
  id: 'string|hex|size:24|required',
};

const createNewAppointmentRules = {
  user_id: 'string|hex|size:24|required',
  types_of_nails_id: 'string|hex|size:24|required',
  details_of_nails: 'string|array|hex|size:24|required',
  duration: 'integer|max:10',
  reserved_at: 'string',
};

module.exports = {
  createNewUserRules,
  loginUserRules,
  createNewNailsTypesRules,
  createNewNailsDetailsRules,
  getSchedulerByDateRules,
  getUserByIdRules,
  createNewAppointmentRules,
};
