const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const saleSchema = Joi.array().required().min(1).items(Joi.object({
  productId: Joi.number().required().integer(),
  quantity: Joi.number().required().integer().min(1),
}));

module.exports = {
  productSchema,
  saleSchema,
};
