const saleServices = require('../services/saleServices');

const create = async (req, res, next) => {
  try {
    const saleBody = req.body;
    const registerSales = await saleServices.create(saleBody);

    return res.status(201).json(registerSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
