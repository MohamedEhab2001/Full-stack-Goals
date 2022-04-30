const errorHandlerMiddleware = (err, req, res, next) => {
  res.json({
    type: err.constructor.name,
    msg: err.message,
    fixIt: err.howToFix,
    status: err.statusCode,
  });
};

module.exports = errorHandlerMiddleware;
