const connection = require('../database/connection');

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now());',
  );

  return insertId;
};

const createProductSales = async (saleId, productId, quantity) => {
  const productSales = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`, [saleId, productId, quantity],
  );

  return productSales;
};

module.exports = {
  createSale,
  createProductSales,
};
