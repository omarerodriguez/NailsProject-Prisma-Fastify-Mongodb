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
};
