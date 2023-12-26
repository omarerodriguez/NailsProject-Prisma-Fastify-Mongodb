module.exports = class NailsTypesHandler {
  constructor(nailsTypesUseCases) {
    this.usecase = nailsTypesUseCases;
  }

  findAllNailsTypes = async (req, res) => {
    try {
      const [nailsTypes, status, err] = await this.usecase.findAllNailsTypes();
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
};
