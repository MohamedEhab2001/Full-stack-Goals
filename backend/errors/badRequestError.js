const goalsError = require("./golasError");
const { StatusCodes } = require("http-status-codes");
class badRequestError extends goalsError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badRequestError;
