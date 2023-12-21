const rules = {
    nombre: 'string|min:3|max:15|required',
    apellido: 'string|min:3|max:20',
    edad: 'integer',
    celular: 'string|max:10|required',
    barrio: 'string|max:40',
    sexo: 'string',
    correo: 'required|email'
};

module.exports = {
    rules
};