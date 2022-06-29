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

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const product = await productServices.create(name);

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
