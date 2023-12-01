const { createNewuUserValidations } = require('../../utils/functions/input-validations');
module.exports = class Userhandler {
    constructor(userUsecases) {
        this.usecases = userUsecases;
    }

    findUserById = async (req, res) => {
        try {
            console.log(req.body);
            const [user, status, err] = await this.usecases.findUserById(req.body.id);
            if (err)
                return res.status(status).send({
                    message: "fail",
                    errors: err,
                });
            return res.status(status).send({
                message: "success",
                data: user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "There war internal server error",
                errors: error,
            });
        }
    };
    
    createNewUser = async (req, res) => {
        try {
            console.log(req.body);
            const errors = createNewuUserValidations(req.body); //
            if (errors)
                return res.status(400).send({
                    message: "fail",
                    errors: errors,
                });
            const [newUser, status, err] = await this.usecases.createNewUser(req.body);
            if (err)
                return res.status(status).send({
                    message: "fail",
                    errors: err,
                });
            return res.status(status).send({
                message: "success",
                data: newUser,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "There war internal server error",
                errors: error,
            });
        }
    };
};
