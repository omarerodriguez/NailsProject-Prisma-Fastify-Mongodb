const Validator = require('validatorjs');

const customPriceRule = (value) => {
  const regex = /^[1-9]\d{0,2}(?:\.\d{3})*(?:,\d{1,2})?$/;
  return regex.test(value);
};
Validator.register('customPrice', customPriceRule);

module.exports = { customPriceRule };
