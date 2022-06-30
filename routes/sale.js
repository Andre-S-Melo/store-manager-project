const express = require('express');
const sales = require('../controllers/saleControllers');

const route = express.Router();

route.post('/', sales.create);

module.exports = route;
