const errorInterceptor = (req, res, next) => {
  const error = new Error('Not found');
  error.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  res.status(res.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
};

module.exports = {
  errorHandler,
  errorInterceptor
};
