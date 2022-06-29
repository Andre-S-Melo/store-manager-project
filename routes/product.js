const express = require('express');
const products = require('../controllers/productControllers');

const route = express.Router();

route.get('/', products.getAll);
route.get('/:id', products.getById);

module.exports = route;
