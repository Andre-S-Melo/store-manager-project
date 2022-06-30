const express = require('express');
const sales = require('./routes/sale');
const products = require('./routes/product');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/sales', sales);
app.use('/products', products);

app.use(errorHandler);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
