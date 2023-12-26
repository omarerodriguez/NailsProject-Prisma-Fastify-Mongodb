const {
  createNewNailsTypesValidations,
} = require('../../../utils/functions/input-validations');
module.exports = class NailsTypesHandler {
  constructor(nailsTypesUseCases) {
    this.usecases = nailsTypesUseCases;
  }

  findAllNailsTypes = async (req, res) => {
    try {
      const [nailsTypes, status, err] = await this.usecases.findAllNailsTypes();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        success: 'success',
        data: nailsTypes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errrors: error,
      });
    }
  };

  findNailsTypesById = async (req, res) => {
    try {
      const [nailsTypes, status, err] = await this.usecases.findNailsTypesById(
        req.params.id,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: nailsTypes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  createNewNailsTypes = async (req, res) => {
    try {
      const errors = this.createNewNailsTypesValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [nailsTypes, status, err] = await this.usecases.createNewNailsTypes(
        req.body,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'succes',
        data: nailsTypes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
      });
    }
  };

  updateNailsTypes = async (req, res) => {
    try {
      const errors = this.createNewNailsTypesValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [updatedNailsTypes, status, err] =
        await this.usecases.updateNailsTypes(req.params.id, req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updatedNailsTypes,
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
