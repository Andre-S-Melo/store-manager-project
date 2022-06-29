require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');

const app = require('./app');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
