const err = require('../utils/error');

const isValidName = (req, _res, next) => {
  const { name } = req.body;

  if (!name) throw err(400, '"name" is required');

  if (name.length < 5) throw err(422, '"name" length must be at least 5 characters long');

  next();
};

const validProduct = [
  isValidName,
];

module.exports = {
  validProduct,
};
