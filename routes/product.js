const express = require('express');
const products = require('../controllers/productControllers');
const { validProduct } = require('../middlewares/productValidation');

const route = express.Router();

route.get('/', products.getAll);
route.post('/', validProduct, products.create);
route.get('/search', products.getBySearch);
route.get('/:id', products.getById);
route.put('/:id', validProduct, products.update);
route.delete('/:id', products.deleteById);

module.exports = route;
