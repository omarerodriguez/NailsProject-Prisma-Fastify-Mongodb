class FindAllTypesBuilder {
  constructor(recordTypes, allDetailsNails) {
    this.typesNails = {};
    this.recordTypes = recordTypes;
    this.allDetailsNails = allDetailsNails;
  }
  build = () => {
    this.setId();
    this.setName();
    this.setallowedDetailsIds();
    this.setallowedDetails();
    this.setdefaultPrice();
    this.setduration();
    this.setDeleteAt();
    this.setCreatedAt();

    return this.typesNails;
  };
  setId = () => (this.typesNails.id = this.recordTypes.id);
  setName = () => (this.typesNails.name = this.recordTypes.name);
  setallowedDetailsIds = () =>
    (this.typesNails.allowed_details_ids = this.recordTypes.allowed_details_ids);
  setallowedDetails = () => {
    const detailsNailsNames = this.allDetailsNails.reduce((acc, detail) => {
      if (this.recordTypes.allowed_details_ids.includes(detail.id)) {
        acc.push(detail.name);
      }
      return acc;
    }, []);
    this.typesNails.allowed_details = detailsNailsNames;
  };
  setdefaultPrice = () =>
    (this.typesNails.default_price = this.recordTypes.default_price);
  setduration = () => (this.typesNails.duration = this.recordTypes.duration);
  setDeleteAt = () =>
    (this.typesNails.deleted_at = this.recordTypes.deleted_at);
  setCreatedAt = () =>
    (this.typesNails.created_at = this.recordTypes.created_at);
}

const buildRecordTypesNails = (recordTypes, allDetailsNails) => {
  const recordTypesNailsBuilder = new FindAllTypesBuilder(
    recordTypes,
    allDetailsNails,
  );
  return recordTypesNailsBuilder.build();
};
module.exports = { buildRecordTypesNails, FindAllTypesBuilder };
