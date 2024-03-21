const {
  createNewTypesNailsValidations,
} = require('../../../utils/functions/input-validations');

module.exports = class TypesNailsHandler {
  constructor(typesNailsUseCases) {
    this.usecases = typesNailsUseCases;
  }

  findAllTypesNails = async (req, res) => {
    try {
      const [typesNails, status, err] = await this.usecases.findAllTypesNails();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: typesNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errrors: error,
      });
    }
  };

  findTypesNailsById = async (req, res) => {
    try {
      const [typeNails, status, err] = await this.usecases.findTypesNailsById(
        req.params.id,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: typeNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  createNewTypesNails = async (req, res) => {
    try {
      const errors = createNewTypesNailsValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [typesNails, status, err] = await this.usecases.createNewTypesNails(
        req.body,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'succes',
        data: typesNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
      });
    }
  };

  updateTypesNails = async (req, res) => {
    try {
      const errors = createNewTypesNailsValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [updatedTypesNails, status, err] =
        await this.usecases.updateTypesNails(req.params.id, req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updatedTypesNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  deleteTypesNails = async (req, res) => {
    try {
      const [typesNails, status, err] = await this.usecases.deleteTypesNails(
        req.params.id,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: `Types nails deleted with ID: ${typesNails.id}`,
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
