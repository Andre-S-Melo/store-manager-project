const err = require('../utils/error');
const productModels = require('../models/productModels');

const getAll = async () => {
  const products = await productModels.getAll();

  return products;
};

const getById = async (id) => {
  const [product] = await productModels.getById(id);
  if (!product) throw err(404, 'Product not found');

  return product;
};

const create = async (name) => {
  const product = await productModels.create(name);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
};
