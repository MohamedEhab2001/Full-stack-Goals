const goalsError = require("./golasError");
const { StatusCodes } = require("http-status-codes");
class unathanticatedError extends goalsError {
  constructor(message, howToFix) {
    super(message, howToFix);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unathanticatedError;
