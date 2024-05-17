class FindAllAppointmentBuilder {
  constructor(recordAppointment, allDetailsNails) {
    this.appointment = {};
    this.recordAppointment = recordAppointment;
    this.allDetailsNails = allDetailsNails;
  }
  build = () => {
    this.setId();
    this.setName();
    this.setLastName();
    this.setTypesOfnails();
    this.setDetailsOfNailsId();
    this.setDetailsOfNails();
    this.setStatus();
    this.setStatusDate();
    this.setStatusLog();
    this.setTotalPrice();
    this.setDuration();
    this.setReservedAt();
    this.setDeleteAt();
    this.setCreatedAt();

    return this.appointment;
  };
  setName = () =>
    (this.appointment.user_name = this.recordAppointment.user.name);
  setLastName = () =>
    (this.appointment.user_last_name = this.recordAppointment.user.last_name);
  setTypesOfnails = () =>
    (this.appointment.types_of_nails_name =
      this.recordAppointment.types_of_nails.name);
  setId = () => (this.appointment.id = this.recordAppointment.id);
  setDetailsOfNails = () => {
    const detailsNailsNames = this.allDetailsNails.reduce((acc, detail) => {
      if (this.recordAppointment.details_of_nails_id.includes(detail.id)) {
        acc.push(detail.name);
      }
      return acc;
    }, []);
    this.appointment.details_of_nails = detailsNailsNames;
  };
  setDetailsOfNailsId = () =>
    (this.appointment.details_of_nails_id =
      this.recordAppointment.details_of_nails_id);
  setStatus = () => (this.appointment.status = this.recordAppointment.status);
  setStatusDate = () =>
    (this.appointment.status_date = this.recordAppointment.status_date);
  setStatusLog = () =>
    (this.appointment.status_logs = this.recordAppointment.status_logs);
  setTotalPrice = () =>
    (this.appointment.total_price = this.recordAppointment.total_price);
  setDuration = () =>
    (this.appointment.duration = this.recordAppointment.duration);
  setReservedAt = () =>
    (this.appointment.reserved_at = this.recordAppointment.reserved_at);
  setDeleteAt = () =>
    (this.appointment.deleted_at = this.recordAppointment.deleted_at);
  setCreatedAt = () =>
    (this.appointment.created_at = this.recordAppointment.created_at);
}

const buildRecordAppointment = (recordAppointment, allDetailsNails) => {
  const recordAppointmentBuilder = new FindAllAppointmentBuilder(
    recordAppointment,
    allDetailsNails,
  );
  return recordAppointmentBuilder.build();
};
module.exports = { buildRecordAppointment, FindAllAppointmentBuilder };
