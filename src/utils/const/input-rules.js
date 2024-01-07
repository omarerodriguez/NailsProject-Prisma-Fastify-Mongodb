const createNewUserRules = {
  nombre: 'string|min:3|max:15|required',
  apellido: 'string|min:3|max:20',
  edad: 'integer',
  celular: 'string|max:10|required',
  barrio: 'string|max:40',
  sexo: 'string',
  correo: 'required|email',
};

const loginUserRules = {
  celular: 'string|max:10|required',
  correo: 'required|email',
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

module.exports = {
  createNewUserRules,
  loginUserRules,
  createNewNailsTypesRules,
  createNewNailsDetailsRules,
};
