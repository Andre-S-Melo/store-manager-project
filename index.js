require('dotenv').config();
const express = require('express');
const products = require('./routes/product');
const sales = require('./routes/sale');
const errorHandler = require('./middlewares/errorHandler');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
const app = require('./app');

app.use(express.json());

app.use('/products', products);
app.use('/sales', sales);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
