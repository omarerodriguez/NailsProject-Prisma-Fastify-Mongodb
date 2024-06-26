const createNewUserRules = {
  name: 'string|between:3,15|required',
  last_name: 'string|between:3,15',
  age: 'integer',
  phone_number: 'string|size:10|required',
  district: 'string|max:40',
  gender: 'string|min:5|max:9',
  email: 'required|email',
};

const updateUserRules = {
  name: 'string|between:3,15',
  last_name: 'string|between:3,15',
  age: 'integer',
  phone_number: 'string|size:10',
  district: 'string|max:40',
  gender: 'string|min:5|max:9',
  email: 'email',
  user_img: 'string|max:255',
  img_weight: 'integer|max:500',
  img_format: 'string|in:jpeg,png,jpg',
  id: 'string|hex|size:24|required',
};

const loginUserRules = {
  phone_number: 'string|size:10|required',
  email: 'required|email',
};

const createNewTypesNailsRules = {
  name: 'required|string|between:4,25',
  default_price: 'required|min:20000|max:500000',
  duration: 'required|integer|max:6',
};

const updateTypesNailsRules = {
  name: 'string|between:4,25',
  default_price: 'integer|min:20000|max:500000',
  duration: 'integer|max:6',
};

const createNewDetailsNailsRules = {
  name: 'required|string|between:4,25',
  price: 'required|integer|min:20000|max:500000',
  duration: 'required|integer|max:6',
};

const updateDetailsNailsRules = {
  name: 'string|between:4,25',
  price: 'integer|min:20000|max:500000',
  duration: 'integer|max:6',
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
  types_of_nails_id: 'string|hex|size:24|required',
  details_of_nails_id: 'array|required',
  duration: 'required|integer|max:10',
  reserved_at: 'date',
};

const updateAppointmentRules = {
  status: 'string|in:RESERVED,CONFIRMED,CANCELED,DELETED',
  types_of_nails_id: 'string|hex|size:24',
  details_of_nails_id: 'array',
  duration: 'integer|max:10',
};

module.exports = {
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
};
