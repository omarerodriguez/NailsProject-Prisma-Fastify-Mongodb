let Validator = require("validatorjs");
const { rules } = require("../const/input-rules");

const createNewuUserValidations = (newUserPayload) => {
    const validation = new Validator(newUserPayload, rules);
    const errors = validation.errors.all();
    if (validation.fails()) return errors;
    return null;
};

module.exports = { createNewuUserValidations };
