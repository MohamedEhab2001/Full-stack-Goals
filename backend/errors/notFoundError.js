const goalsError = require("./golasError");
const { StatusCodes } = require("http-status-codes");
class notFoundError extends goalsError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFoundError;
