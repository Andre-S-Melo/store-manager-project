const saleServices = require('../services/saleServices');

const getAll = async (_req, res, next) => {
  try {
    const sales = await saleServices.getAll();

    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleServices.getById(+id);

    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const saleBody = req.body;
    const registerSales = await saleServices.create(saleBody);

    return res.status(201).json(registerSales);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleBody = req.body;
    const updatedSale = await saleServices.update(+id, saleBody);

    return res.status(200).json(updatedSale);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await saleServices.deleteById(+id);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
