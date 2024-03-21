const Validator = require('validatorjs');

const customPriceRule = (value) => {
  regex = /^\d{1,3}(.\d{3})*(\.\d{1,2})?$/;

  return regex.test(value);
};
Validator.register('customPrice', customPriceRule);

module.exports = { customPriceRule };
