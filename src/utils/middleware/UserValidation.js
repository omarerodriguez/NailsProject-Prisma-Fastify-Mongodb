const validator = require('validatorjs');
const { user } = require('../../../prisma/prismaConfig');


const data = {
    nombre: user.nombre,
    apellido: user.apellido,
    edad: user.edad,
    celular: user.celular,
    barrio: user.barrio,
    sexo: user.sexo,
    correo: user.correo
};
const rules = {
    nombre: 'string|required|min:3',
    apellido: 'string|required|min:10',
    edad: 'integer',
    celular: 'string|size:10|required',
    barrio: 'string|max:40',
    sexo: 'string',
    correo: 'required|email'
};
const validation = new Validator(data, rules);
if (validation.fails())
    console.log(validation.errors.all())

module.exports = { validation }