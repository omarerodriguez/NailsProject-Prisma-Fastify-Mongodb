const createNewUserRules = {
  name: 'string|min:3|max:15|required',
  last_name: 'string|min:3|max:20',
  age: 'integer',
  phone_number: 'string|max:10|required',
  district: 'string|max:40',
  gender: 'string',
  email: 'required|email',
};

const loginUserRules = {
  phone_number: 'string|max:10|required',
  email: 'required|email',
};

const createNewNailsTypesRules = {
  name: 'string|min:3|max:25|required',
  default_price: 'integer|min:3|max:1000000',
  'allowed_detalis.*.name': 'string|min:3|max:25',
  'allowed_detalis.*.price': 'integer',
};

const createNewNailsDetailsRules = {
  name: 'string|min:3|max:25|required',
  price: 'integer|min:3|max:1000000',
};

const getSchedulerByDateRules = {
  date_type: 'string|in:week,half_month,month',
  date_to: 'date',
  date_from: 'date',
};

module.exports = {
  createNewUserRules,
  loginUserRules,
  createNewNailsTypesRules,
  createNewNailsDetailsRules,
  getSchedulerByDateRules,
};
