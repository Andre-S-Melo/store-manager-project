const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../database/connection');
const productsModels = require('../../../models/productModels');

const AllProducts = [
  {
    "id": 1,
    "name": "produto A",
  },
  {
    "id": 2,
    "name": "produto B",
  }
];

const ID = 1;

const productById = {
  "id": 1,
  "name": "produto A",
};

describe('Teste da camada productModels', () => {

  describe('Ao chamar "getAll" para listar todos os produtos', () => {

    describe('Quando não existem produtos cadastrados no BD', () => {

      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const products = await productsModels.getAll();

        expect(products).to.be.empty;
        expect(products).to.be.an('array');
      });
    });

    describe('Quando existem produtos cadastrados no BD', () => {

      before(async () => {
        const execute = [AllProducts];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo os produtos', async () => {
        const products = await productsModels.getAll();

        expect(products).not.to.be.empty;
        expect(products).to.be.an('array');
        products.forEach(product => expect(product).to.be.an('object'));
      });
    });
  });

  describe('Ao chamar "getById" para listar um produto através do seu Id', () => {

    describe('Quando não existe o produto cadastrado no BD', () => {

      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const products = await productsModels.getAll();

        expect(products).to.be.empty;
        expect(products).to.be.an('array');
      });
    });

    describe('Quando existe o produto cadastrado no BD', () => {

      before(async () => {
        const execute = [productById];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um objeto contendo o produto', async () => {
        const product = await productsModels.getById(ID);

        expect(product).to.be.an('object');
      });
    });
  });
});
