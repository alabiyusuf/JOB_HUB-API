const CustomAPIError = require("../errors/custom-api");
const { statusCode } = require("http-status-code");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ err });
  return res.json({ err });
};

module.exports = errorHandlerMiddleware;
