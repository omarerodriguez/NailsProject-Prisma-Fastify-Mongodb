const timeZone = require('../const/timezone');

const getFormatDate = () => {
  const fechaActual = new Date();
  const formatoFechaHora = fechaActual.toLocaleString('es-ES', timeZone);
  const fechaFormateadaConEspacios = formatoFechaHora.replace(',', '');
  return fechaFormateadaConEspacios;
};

const addHour = (originalDate, hoursToAdd) => {
  if (!(originalDate instanceof Date)) {
    throw new Error('El primer argumento debe ser una instancia de Date.');
  }

  if (typeof hoursToAdd !== 'number' || isNaN(hoursToAdd)) {
    throw new Error('El segundo argumento debe ser un número válido.');
  }

  const newDate = new Date(originalDate.getTime());
  newDate.setHours(newDate.getHours() + hoursToAdd);

  return newDate;
};


module.exports = { getFormatDate, addHour };