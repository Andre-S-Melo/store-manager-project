const schema = require('./schema');
const err = require('../utils/error');

const validSale = (req, _res, next) => {
  const [data] = req.body;
  const { error } = schema.saleSchema.validate(data);

  if (error) {
    if (error.message.includes('required')) {
      return next(err(400, error.message));
    }
    return next(err(422, error.message));
  }
  next();
};

module.exports = {
  validSale,
};
