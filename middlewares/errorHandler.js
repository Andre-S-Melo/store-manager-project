const errorHandler = (err, _req, res, _next) => {
  if (!err.code) {
    console.log(err);
    return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
  }
  return res.status(err.code).json({ message: err.message });
};

module.exports = errorHandler;
