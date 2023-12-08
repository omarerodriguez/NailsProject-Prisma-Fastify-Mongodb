let Validator = require("validatorjs");
const { rules } = require("../const/input-rules");
const jwt = require('jsonwebtoken');

const createNewuUserValidations = (newUserPayload) => {
    const validation = new Validator(newUserPayload, rules);
    const errors = validation.errors.all();
    if (validation.fails()) return errors;
    return null;
};

const validateToken = (req, res, done) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) res.send('Access denied');

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) res.send('Access denied, Token expired')
        else { done(); }
    })
};
module.exports = { createNewuUserValidations, validateToken };
