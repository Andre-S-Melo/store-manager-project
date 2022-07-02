const sinon = require('sinon');
const { expect } = require('chai');
const productsModels = require('../../../models/productModels');
const productsServices = require('../../../services/productServices');

const allProducts = [
  {
    "id": 1,
    "name": "produto A",
  },
  {
    "id": 2,
    "name": "produto B",
  }
];

const ID = 10;

const productById = {
  "id": 1,
  "name": "produto A",
};

describe('Teste da camada productServices', () => {

  describe('Ao chamar "getAll" para listar todos os produtos', () => {

    describe('Quando não existem produtos cadastrados no BD', () => {

      before(() => {
        sinon.stub(productsModels, 'getAll').resolves([]);
      });

      after(() => {
        productsModels.getAll.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const products = await productsServices.getAll();

        expect(products).to.be.empty;
        expect(products).to.be.an('array');
      });
    });

    describe('Quando existem produtos cadastrados no BD', () => {

      before(() => {
        sinon.stub(productsModels, 'getAll').resolves(allProducts);
      });

      after(() => {
        productsModels.getAll.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo os produtos', async () => {
        const products = await productsServices.getAll();

        expect(products).not.to.be.empty;
        expect(products).to.be.an('array');
        products.forEach(product => expect(product).to.be.an('object'));
      });
    });
  });

  describe('Ao chamar "getById" para listar um produto através do seu Id', () => {

    describe('Quando não existe o produto cadastrado no BD', () => {
      const err = { code: 404, message: "Product not found" };

      before(() => {
        sinon.stub(productsModels, 'getById').throws(err);
      });

      after(() => {
        productsModels.getById.restore();
      });

      it('Responde a requisição retornando um erro 404 "Product not found"', async () => {
        try {
          await productsServices.getById(ID);
        } catch (error) {
          expect(error).to.deep.equal(err);
        }
      });
    });

    describe('Quando existe o produto cadastrado no BD', () => {

      before(() => {
        sinon.stub(productsModels, 'getById').resolves([productById]);
      });

      after(() => {
        productsModels.getById.restore();
      });

      it('Responde a requisição retornando um objeto contendo o produto', async () => {
        const product = await productsServices.getById(ID);

        expect(product).to.be.an('object');
      });
    });
  });
});
