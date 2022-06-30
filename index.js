require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
