module.exports = class AppointmentrHandler {
  constructor(appointmentUseCases) {
    this.usecases = appointmentUseCases;
  }

  findAllAppointments = async (req, res) => {
    try {
      const [appointmets, status, err] =
        await this.usecases.findAllAppointments();
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: appointmets,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };
  findAppointmentById = async (req, res) => {
    try {
      const [appointmentId, status, err] =
        await this.usecases.findAppointmentById(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: appointmentId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };
  findAppointmentByUser = async (req, res) => {
    try {
      const [userId, status, err] = await this.usecases.findAppointmentByUser(
        req.params.id,
      );
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: userId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };
  createNewAppointment = async (req, res) => {
    try {
      const [appointmentPayload, status, err] =
        await this.usecases.createNewAppointment(req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'succes',
        data: appointmentPayload,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
      });
    }
  };

  updateAppointment = async (req, res) => {
    try {
      const [updateAppointment, status, err] =
        await this.usecases.updateAppointment(req.params.id, req.body);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: updateAppointment,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error,
      });
    }
  };
  deleteAppointment = async (req, res) => {
    try {
      const [deleteAppointment, status, err] =
        await this.usecases.deleteAppointment(req.params.id);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: `deleted appointment Details with ID: ${deleteAppointment.id}`,
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
