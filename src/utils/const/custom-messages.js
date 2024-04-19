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
  'required.default_price': 'El campo es obligatorio',
  'customPrice.default_price':
    'El campo debe tener un monto mínimo de $5.000,00 y máximo de $1.000.000,00M (COP)',
  'required.duration': 'El campo es obligatorio',
  'integer.duration': 'El campo debe ser un numero entero',
  'max.duration': 'La duracion debe ser entre 1-6',
};

const customMessagesCreateDetailsNails = {
  'required.name': 'El campo es obligatorio.',
  'string.name': 'El campo deben ser letras',
  'between.name': 'El campo tener mínimo 3 y  máximo 25 caracteres',
  'required.price': 'El campo es obligatorio',
  'customPrice.price':
    'El campo debe tener un monto mínimo de $5.000,00 y máximo de $1.000.000,00M (COP)',
  'required.duration': 'El campo es obligatorio',
  'integer.duration': 'El campo debe ser un numero entero',
  'max.duration': 'La duracion debe ser entre 1-6',
};

const customMessagesLoginUser = {
  'required.phone_number': 'El campo es obligatorio.',
  'size.phone_number': 'El campo debe ser de máximo de 10 dígitos',
  'required.email': 'El campo es obligatorio',
  'email.email': 'El campo no es una dirección de correo electrónico válida.',
};

const customMessagesCreateUpdateAppointment = {
  'required.user_id': 'El campo es obligatorio.',
  'string.user_id': 'El campo deben ser letras',
  'size.user_id': 'El campo debe ser de máximo de 24 caracteres',
  'required.types_of_nails_id': 'El campo es obligatorio.',
  'string.types_of_nails_id': 'El campo deben ser letras',
  'size.types_of_nails_id': 'El campo debe ser de máximo de 24 caracteres',
  'required.details_of_nails_id': 'El campo es obligatorio.',
  'string.details_of_nails_id': 'El campo deben ser letras',
  'size.details_of_nails_id': 'El campo debe ser de máximo de 24 caracteres',
  'array.details_of_nails_id': 'El campo debe ser un arreglo',
  'required.duration': 'El campo es obligatorio',
  'integer.duration': 'El campo debe un numero',
  'max.duration': 'El campo debe ser maximo 10',
  'date.reserved_at':
    'El campo debe ser en formato fecha y hora "dd/mm/aa hh:mm:ss"',
};

module.exports = {
  customMessagesCreateUser,
  customMessagesCreateNailsTypes,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
  customMessagesCreateUpdateAppointment,
};
