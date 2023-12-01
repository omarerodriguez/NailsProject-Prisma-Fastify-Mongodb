const rules = {
    nombre:'string|required',
    apellido:'string|required',
        edad: 'integer',
        celular:'string|max:10|required',
        barrio:'string|max:40',
        sexo:'string',
        correo:'required|email'
};

module.exports = {
    rules
};