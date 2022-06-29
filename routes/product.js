const express = require('express');
const products = require('../controllers/productControllers');
const { validProduct } = require('../middlewares/productValidation');

const route = express.Router();

route.get('/', products.getAll);
route.post('/', validProduct, products.create);
route.get('/:id', products.getById);

module.exports = route;
