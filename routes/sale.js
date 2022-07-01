const express = require('express');
const sales = require('../controllers/saleControllers');
const { validSale } = require('../middlewares/saleValidation');

const route = express.Router();

route.get('/', sales.getAll);
route.post('/', validSale, sales.create);
route.get('/:id', sales.getById);
route.put('/:id', sales.update);
route.delete('/:id', sales.deleteById);

module.exports = route;
