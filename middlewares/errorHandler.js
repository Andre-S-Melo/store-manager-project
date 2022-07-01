const errorHandler = (err, _req, res, _next) => {
  if (!err.statusCode) {
    console.log(err);
    return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
  return res.status(err.statusCode).json({ message: err.message });
};

module.exports = errorHandler;
