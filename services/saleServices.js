const err = require('../utils/error');
const saleModels = require('../models/saleModels');
// const productModels = require('../models/productModels');

const getAll = async () => {
  const sales = await saleModels.getAll();

  return sales;
};

const getById = async (id) => {
  const sale = await saleModels.getById(id);
  // if (!sale.length) throw err(404, 'Sale not found');

  return sale;
};

const create = async (saleBody) => {
  const saleCreated = await saleModels.createSale();

  // const productValidat = await Promise.all(saleBody.map(async ({ productId }) => {
  //   const result = await productModels.getById(productId);

  //   return result;
  // }));
  
  // if (productValidat.some((item) => item.length === 0)) {
  //   throw err(404, 'Product not found');
  // }

  await Promise.all(saleBody.map(async ({ productId, quantity }) => {
    await saleModels.createProductSales(saleCreated, productId, quantity);
  }));

  return {
    id: saleCreated,
    itemsSold: saleBody,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
