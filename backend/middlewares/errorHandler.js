const errorHandlerMiddleware = (err, req, res, next) => {
  res.json({
    msg: err.message,
    fixIt: err.howToFix,
    status: err.statusCode,
  });
};

module.exports = errorHandlerMiddleware;
