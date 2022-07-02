const err = require('../utils/error');
const saleModels = require('../models/saleModels');
const productModels = require('../models/productModels');

const getAll = async () => {
  const sales = await saleModels.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await saleModels.getById(id);
  if (!sale.length) throw err(404, 'Sale not found');

  return sale;
};

const create = async (saleBody) => {
  const validProduct = await Promise.all(saleBody.map(async ({ productId }) => {
    const result = await productModels.getById(productId);
    return result;
  }));

  if (validProduct.some((item) => item.length === 0)) {
    throw err(404, 'Product not found');
  }
  
  const saleCreated = await saleModels.createSale();
  await Promise.all(saleBody.map(async ({ productId, quantity }) => {
    await saleModels.createProductSales(saleCreated, productId, quantity);
  }));

  return {
    id: saleCreated,
    itemsSold: saleBody,
  };
};

const update = async (id, saleBody) => {
  const sale = await saleModels.getById(id);
  if (!sale.length) throw err(404, 'Sale not found');

  const validProduct = await Promise.all(saleBody.map(async ({ productId }) => {
    const result = await productModels.getById(productId);
    return result;
  }));

  if (validProduct.some((item) => item.length === 0)) {
    throw err(404, 'Product not found');
  }

  await Promise.all(saleBody.map(async ({ productId, quantity }) => {
    await saleModels.update(id, productId, quantity);
  }));

  return {
    saleId: id,
    itemsUpdated: saleBody,
  };
};

const deleteById = async (id) => {
  const saleById = await getById(id);
  if (!saleById) throw err(404, 'Product not found');

  await saleModels.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
