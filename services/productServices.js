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

const getBySearch = async (q) => {
  const products = await getAll();
  if (!q) return products;

  const searchProduct = products.filter((product) => product.name.includes(q));
  if (!searchProduct) return '[]';

  return searchProduct;
};

const create = async (name) => {
  const product = await productModels.create(name);

  return product;
};

const update = async (id, name) => {
  const productById = await getById(id);
  if (!productById) throw err(404, 'Product not found');

  const product = await productModels.update(id, name);

  return product;
};

const deleteById = async (id) => {
  const productById = await getById(id);
  if (!productById) throw err(404, 'Product not found');

  await productModels.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  getBySearch,
  create,
  update,
  deleteById,
};
