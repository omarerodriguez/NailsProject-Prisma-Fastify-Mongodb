module.exports = class SchedulerHandler {
  constructor(schedulerUsecases) {
    this.usecases = schedulerUsecases;
  }

  findAllSchedulers = async (req, res) => {
    try {
      const [schedulers, status, err] = await this.usecases.findAllSchedulers();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: schedulers,
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
