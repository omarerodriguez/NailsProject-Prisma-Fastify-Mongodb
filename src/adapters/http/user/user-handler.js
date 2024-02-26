const {
  createNewuUserValidations,
  loginUserValidations,
  getUserByIdValidations,
} = require('../../../utils/functions/input-validations');

module.exports = class Userhandler {
  constructor(userUsecases) {
    this.usecases = userUsecases;
  }

  findAllUsers = async (req, res) => {
    try {
      const [users, status, err] = await this.usecases.findAllUsers();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  findUserById = async (req, res) => {
    try {
      const errors = getUserByIdValidations(req.params); //
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [user, status, err] = await this.usecases.findUserById(
        req.params.id,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  findUserByEmail = async (req, res) => {
    try {
      const { email } = req.query;
      const [user, status, err] = await this.usecases.findUserByEmail(email);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  findUserByPhoneNumber = async (req, res) => {
    try {
      const { phone_number } = req.query;
      const [user, status, err] = await this.usecases.findUserByPhoneNumber(
        phone_number,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  createNewUser = async (req, res) => {
    try {
      const errors = createNewuUserValidations(req.body); //
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });

      const [token, status, err] = await this.usecases.createNewUser(req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });

      res.header('Set-Cookie', `token=${token}`);
      return res.status(status).send({
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  loginUser = async (req, res) => {
    try {
      const validationErrors = loginUserValidations(req.body);
      if (validationErrors) {
        return res.status(400).send({
          message: 'fail',
          errors: validationErrors,
        });
      }

      const { token, user, statusCode, error } = await this.usecases.loginUser(
        req.body,
      );

      if (error) {
        return res.status(statusCode).send({
          message: 'fail',
          errors: error,
        });
      }

      res.header('Set-Cookie', `token=${token}`);
      return res.status(statusCode).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was an internal server error',
        errors: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const userIdErrors = getUserByIdValidations(req.params); //
      if (userIdErrors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const errors = createNewuUserValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [updatedUser, status, err] = await this.usecases.updateUser(
        req.params.id,
        req.body,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userToken = req.headers.authorization.split(' ')[1];
      const [user, status, err] = await this.usecases.deleteUser(
        req.params.id,
        userToken,
      );
      console.log(userToken);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: `deleted user with ID: ${user.id}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };
};
