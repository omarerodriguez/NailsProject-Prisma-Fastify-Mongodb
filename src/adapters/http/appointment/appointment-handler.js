const {
  createNewAppointmentValidations,
  updateAppointmentValidations,
} = require('../../../utils/functions/input-validations');

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
        errors: error.message,
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
        errors: error.message,
      });
    }
  };

  findAppointmentByUser = async (req, res) => {
    try {
      if (!res.locals?.decodedToken)
        return res.status(400).send({
          message: 'fail',
          errors: 'TokenBody is required',
        });
      const { decodedToken } = res.locals ?? null;
      const userId = decodedToken.userId;
      const [appointments, status, err] =
        await this.usecases.findAppointmentByUser(userId);
      if (err)
        return res.status(status).send({
          message: 'fail',
          errors: err,
        });
      return res.status(status).send({
        message: 'success',
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: 'There was internal server error',
        errors: error.message,
      });
    }
  };

  createNewAppointment = async (req, res) => {
    try {
      if (!res.locals?.decodedToken)
        return res.status(400).send({
          message: 'fail',
          errors: 'TokenBody is required',
        });

      const { decodedToken } = res.locals ?? null;
      const errors = createNewAppointmentValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
      const [appointmentPayload, status, err] =
        await this.usecases.createNewAppointment(req.body, decodedToken);
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
        errors: error.message,
      });
    }
  };

  updateAppointment = async (req, res) => {
    try {
      const errors = updateAppointmentValidations(req.body);
      if (errors)
        return res.status(400).send({
          message: 'fail',
          errors,
        });
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
        errors: error.message,
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
        errors: error.message,
      });
    }
  };
};
