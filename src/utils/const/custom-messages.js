const customMessagesCreateUser = {
  'required.name': 'El campo :attribute(nombre) es obligatorio.',
  'string.name': 'El campo :attribute(nombre) deben ser letras',
  'between.name':
    'El campo :attribute(nombre) debe tener mínimo 3 y máximo 15 caracteres',
  'string.last_name': 'El campo :attribute deben ser letras',
  'between.last_name':
    'El campo :attribute(apellido) debe tener mínimo 3 y máximo 20 caracteres',
  'integer.age': 'El campo :attributr(edad) deber ser un número',
  'required.phone_number': 'El campo :attribute(celular) es obligatorio.',
  'string.phone_number':
    'El campo :attribute(celular) el numero debe ir entre comillas dobles',
  'size.phone_number':
    'El campo :attribute(celular) debe ser de máximo de 10 dígitos',
  'string.district': 'El campo :attribute(barrio) deben ser letras',
  'max.district':
    'El campo :attribute(barrio) debe tener  máximo 40 caracteres',
  'string.gender': 'El campo :attribute(genero) deben ser letras',
  'max.gender': 'El campo :attribute(genero) debe ser [HOMBRE,MUJER u OTROS]',
  'required.email': 'El campo :attribute(correo) es obligatorio',
  'email.email':
    'El campo :attribute(correo) no es una dirección de correo electrónico válida.',
};

const customMessagesCreateNailsTypes = {
  'required.name': 'El campo :attribute es obligatorio.',
  'string.name': 'El campo :attribute(nombre) deben ser letras.',
  'between.name':
    'El campo :attribute(nombre) tener mínimo 4 y máximo 25 caracteres',
  'integer.default_price':
    'El campo :attribute(precio por defecto) debe ser un número',
  'between.default_price':
    'El campo :attribute(precio por defecto) el monto mínimo debe ser de $500 y máximo debe ser de $1M (COP)',
};

const customMessagesCreateDetailsNails = {
  'required.name': 'El campo :attribute(nombre) es obligatorio.',
  'string.name': 'El campo :attribute(nombre) deben ser letras',
  'between.name':
    'El campo :attribute(nombre) tener mínimo 3 y  máximo 25 caracteres',
  'integer.price': 'El campo :attribute(precio) debe ser un numero',
  'between.price':
    'El campo :attribute(precio) el monto mínimo debe ser de $500 y máximo es de $1M (COP)',
};

const customMessagesLoginUser = {
  'required.phone_number': 'El campo :attribute(celular) es obligatorio.',
  'size.phone_number':
    'El campo :attribute(celular) debe ser de máximo de 10 dígitos',
  'required.email': 'El campo :attribute(correo) es obligatorio',
  'email.email':
    'El campo :attribute(correo) no es una dirección de correo electrónico válida.',
};

module.exports = {
  customMessagesCreateUser,
  customMessagesCreateNailsTypes,
  customMessagesCreateDetailsNails,
  customMessagesLoginUser,
};
