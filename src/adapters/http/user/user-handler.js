const {
  createNewuUserValidations,
  loginUserValidations,
  getUserByIdValidations,
} = require('../../../utils/functions/input-validations');
const cloudinary = require('../../../infraestructura/cloudinary/cloudinaryConfig');
const { getFormatDate } = require('../../../utils/functions/date');

module.exports = class Userhandler {
  constructor(userUsecases, tokenUseCases) {
    this.userUsercases = userUsecases;
    this.tokenUseCases = tokenUseCases;
  }

  findAllUsers = async (req, res) => {
    try {
      const [users, status, err] = await this.userUsercases.findAllUsers();
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
      const [user, status, err] = await this.userUsercases.findUserById(
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
      const [user, status, err] = await this.userUsercases.findUserByEmail(email);
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
      const [user, status, err] = await this.userUsercases.findUserByPhoneNumber(
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

      const [user, token, status, err] = await this.userUsercases.createNewUser(
        req.body,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      const decodedToken = this.tokenUseCases.decodedToken(token);
      return res.status(status).send({
        data: user,
        token,
        exp_date: getFormatDate(decodedToken.iat * 1000),
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
      if (validationErrors)
        return res.status(400).send({
          message: 'fail',
          errors: validationErrors,
        });

      const [token, user, status, err] = await this.userUsercases.loginUser(
        req.body,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      const decodedToken = this.tokenUseCases.decodedToken(token);
      return res.status(status).send({
        token,
        exp_date: getFormatDate(decodedToken.iat * 1000),
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

  updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await req.file();

      const errors = updateUserValidations({ id: userId });
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
        if (!res.locals?.decodedToken)
        return res.status(400).send({
          message: 'fail',
          errors: 'TokenBody is required',
        });
      const { decodedToken } = res.locals ?? null;
      const userId = decodedToken.userId;
      const [updatedUser, status, err] = await this.usecases.updateUser(
        userId,
        {},
        data.file,
        userId,
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
      const [user, status, err] = await this.userUsercases.deleteUser(
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

  refreshToken = async (req, res) => {
    try {
      const { token } = req.body;
      const [newToken, error] = await this.userUsercases.refreshToken(token);
      if (error) {
        return res.status(400).send({ error });
      }
      const decodedToken = this.tokenUseCases.decodedToken(token);
      return res.send({
        token: newToken,
        exp_date: getFormatDate(decodedToken.iat * 1000),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was an internal server error',
        errors: error,
      });
    }
  };
};
