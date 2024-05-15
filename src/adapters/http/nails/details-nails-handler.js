const {
  createNewDetailsNailsValidations,
  updateDetailsNailsValidations
} = require('../../../utils/functions/input-validations');
module.exports = class DetailsNailsHandler {
  constructor(detailsNailsUseCases) {
    this.usecases = detailsNailsUseCases;
  }

  findAllDetailsNails = async (req, res) => {
    try {
      const [detailsNails, status, err] =
        await this.usecases.findAllDetailsNails();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: detailsNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errrors: error,
      });
    }
  };

  findDetailsNailsById = async (req, res) => {
    try {
      const [detailNails, status, err] =
        await this.usecases.findDetailsNailsById(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: detailNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  createNewNailsDetalis = async (req, res) => {
    try {
      const errors = createNewDetailsNailsValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [newDetailsNails, status, err] =
        await this.usecases.createNewNailsDetalis(req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'succes',
        data: newDetailsNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
      });
    }
  };

  updateDetailsNails = async (req, res) => {
    try {
      const errors = updateDetailsNailsValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        }); 
      const [updateDetailNails, status, err] =
        await this.usecases.updateDetailsNails(req.params.id, req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updateDetailNails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  deleteDetailsNails = async (req, res) => {
    try {
      const [deleteDetailNails, status, err] =
        await this.usecases.deleteDetailsNails(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: `Details nails deleted with ID: ${deleteDetailNails.id}`,
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
