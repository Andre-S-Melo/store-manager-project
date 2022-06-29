const connection = require('../database/connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id ASC;', [id],
  );

  return product;
};

module.exports = {
  getAll,
  getById,
};
