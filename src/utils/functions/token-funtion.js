const extractTokenToHeader = (reqObject) =>
  reqObject.headers?.authorization?.split(' ')[1];

module.exports = {
  extractTokenToHeader,
};
