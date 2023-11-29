const timeZone = require('../const/timezone');

const getFormatDate = ()=>{ 
  const fechaActual = new Date();
  const formatoFechaHora = fechaActual.toLocaleString(('es-CO', timeZone));
  const fechaFormateadaConEspacios = formatoFechaHora.replace(',','');
  return fechaFormateadaConEspacios;
}


module.exports = {getFormatDate};