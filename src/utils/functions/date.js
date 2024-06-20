const timeZone = require('../const/timezone');
const moment = require('moment-timezone');

const getFormatDate = (date, timezone, format) => {
  const currentDate = date ? moment(date) : moment();
  if (timezone) {
    currentDate.tz(timeZone);
  }
  return format ? currentDate.format(format) : currentDate.toISOString();
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

const addDays = (originalDate, daysToAdd) => {
  if (!(originalDate instanceof Date)) {
    throw new Error('El primer argumento debe ser una instancia de Date.');
  }

  if (typeof daysToAdd !== 'number' || isNaN(daysToAdd)) {
    throw new Error('El segundo argumento debe ser un número válido.');
  }

  const newDate = new Date(originalDate.getTime());
  newDate.setDate(newDate.getDate() + daysToAdd);
  newDate.setHours(0, 0, 0, 0);
  return getFormatDate(newDate);
};

const setHourToDate = (date, hours) => {
  const newDate = new Date(date);
  newDate.setHours(hours, 0, 0, 0);
  return getFormatDate(newDate);
};

function getTimezoneOfDate(dateString, timeZone) {
  return moment.tz(dateString, timeZone).tz();
}

function isValidDateFormat(dateString) {
  let parsedDate = dateString;
  if (typeof dateString !== 'string') date = moment(dateString).toISOString();
  const [year, month, day] = parsedDate.split('-');
  return year.length === 4 && month.length === 2 && day.length === 2;
}

function isValidISO8601(dateString) {
  let date = dateString;
  if (typeof dateString !== 'string') date = moment(dateString).toISOString();
  return moment(date, moment.ISO_8601, true).isValid();
}

module.exports = {
  getFormatDate,
  addHour,
  addDays,
  setHourToDate,
  getTimezoneOfDate,
  isValidDateFormat,
  isValidISO8601,
};
