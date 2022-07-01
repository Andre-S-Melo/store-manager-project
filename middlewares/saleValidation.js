const err = require('../utils/error');

const isValidSale = (req, _res, next) => {
  const [{ productId, quantity }] = req.body;

  if (!productId) throw err(400, '"productId" is required');

  if (!Number.isInteger(quantity)) throw err(400, '"quantity" is required');

  if (quantity <= 0) throw err(422, '"quantity" must be greater than or equal to 1');

  next();
};

const validSale = [
  isValidSale,
];

module.exports = {
  validSale,
};
