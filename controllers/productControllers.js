const productServices = require('../services/productServices');

const getAll = async (_req, res, next) => {
  try {
    const products = await productServices.getAll();

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productServices.getById(id);

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getBySearch = async (req, res, next) => {
  try {
    const { q } = req.query;
    const searchProduct = await productServices.getBySearch(q);

    return res.status(200).json(searchProduct);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await productServices.create(name);

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedProduct = await productServices.update(+id, name);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productServices.deleteById(id);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getBySearch,
  create,
  update,
  deleteById,
};
