const goalsError = require("./golasError");
const { StatusCodes } = require("http-status-codes");
class internalServerError extends goalsError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = internalServerError;
