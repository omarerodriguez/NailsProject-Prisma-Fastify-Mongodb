const {
  createNewNailsDetailsValidations,
} = require('../../../utils/functions/input-validations');
module.exports = class NailsDetailsHandler {
  constructor(nailsDetailsUseCases) {
    this.usecases = nailsDetailsUseCases;
  }

  findAllNailsDetails = async (req, res) => {
    try {
      const [nailsDetails, status, err] =
        await this.usecases.findAllNailsDetails();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        success: 'success',
        data: nailsDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errrors: error,
      });
    }
  };

  findNailsDetailsById = async (req, res) => {
    try {
      const [nailsDetail, status, err] =
        await this.usecases.findNailsDetailsById(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: nailsDetail,
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
      const errors = createNewNailsDetailsValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [newNailsDetails, status, err] =
        await this.usecases.createNewNailsDetalis(req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'succes',
        data: newNailsDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
      });
    }
  };

  updateNailsDetails = async (req, res) => {
    try {
      const [updateNailsDetail, status, err] =
        await this.usecases.updateNailsDetails(req.params.id, req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updateNailsDetail,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };

  deleteNailsDetails = async (req, res) => {
    try {
      const [deleteNailsDetail, status, err] =
        await this.usecases.deleteNailsDetails(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: `deleted Nails Details with ID: ${deleteNailsDetail.id}`,
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
