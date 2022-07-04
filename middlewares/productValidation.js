const schema = require('./schema');
const err = require('../utils/error');

const validProduct = (req, _res, next) => {
  const { error } = schema.productSchema.validate(req.body);

  if (error) {
    if (error.message.includes('required')) {
      return next(err(400, error.message));
    }
    return next(err(422, error.message));
  }
  next();
};

module.exports = {
  validProduct,
};
