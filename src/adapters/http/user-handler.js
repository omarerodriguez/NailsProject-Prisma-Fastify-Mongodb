const {
  createNewuUserValidations,
} = require('../../utils/functions/input-validations');

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
        message: 'There war internal server error',
        errors: error,
      });
    }
  };

  findUserById = async (req, res) => {
    try {
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
        message: 'There war internal server error',
        errors: error,
      });
    }
  };

  findUserByEmail = async (req, res) => {
    try {
      const { correo } = req.query;
      const [user, status, err] = await this.usecases.findUserByEmail(correo);
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
        message: 'There war internal server error',
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
      res.header('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
      return res.status(status).send({
        message: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There war internal server error',
        errors: error,
      });
    }
  };

  loginUser = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token)
        return res.send({ message: 'Error', errors: 'Invalid token' });
      const { correo } = req.body;
      const [user, status, err] = await this.usecases.loginUser(correo);
      // if (user.correo !== correo) return res.send({ message: "Error", errors: "correo o celular incorrecto" })
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      res.header('Set-Cookie', `token=${token}; Path=/; HttpOnly`);

      return res.status(status).send({
        message: 'success',
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There war internal server error',
        errors: error,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
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
        message: 'There war internal server error',
        errors: error,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const [user, status, err] = await this.usecases.deleteUser(req.params.id);
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
        message: 'There war internal server error',
        errors: error,
      });
    }
  };
};
