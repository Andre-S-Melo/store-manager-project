const schema = require('./schema');
const err = require('../utils/error');

const validSale = (req, _res, next) => {
  const { error } = schema.saleSchema.validate(req.body);

  if (error) {
    if (error.message.includes('required')) {
      return next(err(400, error.message.replace(/\[.\]\./, '')));
    }
    return next(err(422, error.message.replace(/\[.\]\./, '')));
  }
  next();
};

module.exports = {
  validSale,
};
