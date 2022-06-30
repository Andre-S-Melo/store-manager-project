const connection = require('../database/connection');

const getAll = async () => {
  const QUERY = `SELECT SP.sale_id AS saleId, SL.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS SL
    ON SP.sale_id = SL.id
    ORDER BY SP.sale_id ASC;`;

  const [sales] = await connection.execute(QUERY);

  return (sales);
};

const getById = async (id) => {
  const QUERY = `SELECT SL.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS SL
    ON SP.sale_id = SL.id
    WHERE SP.sale_id = ?
    ORDER BY SP.sale_id ASC;`;

  const [sale] = await connection.execute(QUERY, [id]);

  return (sale);
};

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

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?', [id],
  );
};

module.exports = {
  getAll,
  getById,
  createSale,
  createProductSales,
  deleteById,
};
