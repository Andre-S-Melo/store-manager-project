const saleModels = require('../models/saleModels');

const create = async (saleBody) => {
  const saleCreated = await saleModels.createSale();

  await Promise.all(saleBody.map(async ({ productId, quantity }) => {
    await saleModels.createProductSales(saleCreated, productId, quantity);
  }));

  return {
    id: saleCreated,
    itemsSold: saleBody,
  };
};

module.exports = {
  create,
};
