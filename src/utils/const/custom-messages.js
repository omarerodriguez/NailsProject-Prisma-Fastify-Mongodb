const customMessagesCreateUser = {
  'required.name': 'El campo es obligatorio.',
  'string.name': 'El deben ser letras',
  'between.name': 'El campo debe tener mínimo 3 y máximo 15 caracteres',
  'string.last_name': 'El campo  deben ser letras',
  'between.last_name': 'El campo debe tener mínimo 3 y máximo 20 caracteres',
  'integer.age': 'El campo deber ser un número',
  'required.phone_number': 'El campo es obligatorio.',
  'string.phone_number': 'El campo el numero debe ir entre comillas dobles',
  'size.phone_number': 'El campo debe ser de máximo de 10 dígitos',
  'string.district': 'El campo deben ser letras',
  'max.district': 'El campo debe tener  máximo 40 caracteres',
  'string.gender': 'El campo deben ser letras',
  'max.gender': 'El campo debe ser [HOMBRE,MUJER u OTROS]',
  'required.email': 'El campo es obligatorio',
  'email.email': 'El campo no es una dirección de correo electrónico válida.',
};

const customMessagesCreateNailsTypes = {
  'required.name': 'El campo es obligatorio.',
  'string.name': 'El campo deben ser letras.',
  'between.name': 'El campo tener mínimo 4 y máximo 25 caracteres',
  'integer.default_price': 'El campo debe ser un número',
  'between.default_price':
    'El campo el monto mínimo debe ser de $500 y máximo debe ser de $1M (COP)',
};

const customMessagesCreateDetailsNails = {
  'required.name': 'El campo es obligatorio.',
  'string.name': 'El campo deben ser letras',
  'between.name': 'El campo tener mínimo 3 y  máximo 25 caracteres',
  'integer.price': 'El campo debe ser un numero',
  'between.price':
    'El campo el monto mínimo debe ser de $500 y máximo es de $1M (COP)',
};

const customMessagesLoginUser = {
  'required.phone_number': 'El campo es obligatorio.',
  'size.phone_number': 'El campo debe ser de máximo de 10 dígitos',
  'required.email': 'El campo es obligatorio',
  'email.email': 'El campo no es una dirección de correo electrónico válida.',
};

module.exports = {
  customMessagesCreateUser,
  customMessagesCreateNailsTypes,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
};
