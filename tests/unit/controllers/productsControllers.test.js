const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productServices');
const productsController = require('../../../controllers/productControllers');

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

const productById = {
  "id": 1,
  "name": "produto A",
};

describe('Teste da camada productControllers', () => {

  describe('Ao chamar "getAll" para listar todos os produtos', () => {
    let req = {}, res = {}, next = {};

    describe('Quando não existem produtos cadastrados no BD', () => {

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsServices, 'getAll').resolves([]);
      });

      after(() => {
        productsServices.getAll.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await productsController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um array vazio', async () => {
        await productsController.getAll(req, res, next);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Quando existem produtos cadastrados no BD', () => {

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsServices, 'getAll').resolves(allProducts);
      });

      after(() => {
        productsServices.getAll.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await productsController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um array de objetos contendo os produtos', async () => {
        await productsController.getAll(req, res, next);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Quando ocorre um erro no serviço da API', () => {
      const err = { code: 500, message: "INTERNAL SERVER ERROR" }

      before(() => {
        next = sinon.stub();
        sinon.stub(productsServices, 'getAll').throws(err);
      });

      after(() => {
        productsServices.getAll.restore();
      });

      it('O erro é enviado para o próximo handler de erro', async () => {
        await productsController.getAll(req, res, next);

        expect(next.calledWith(err)).to.be.equal(true);
      });
    });
  });

  describe('Ao chamar "getById" para listar um produto através do seu Id', () => {
    let req = {}, res = {}, next = {};

    describe('Quando não existe o produto cadastrado no BD', () => {
      const err = { code: 404, message: "Product not found" };

      before(() => {
        req.params = { id: 1 };
        next = sinon.stub();
        sinon.stub(productsServices, 'getById').throws(err);
      });

      after(() => {
        productsServices.getById.restore();
      });

      it('O erro é enviado para o próximo handler de erro', async () => {
        await productsController.getById(req, res, next);

        expect(next.calledWith(err)).to.be.equal(true);
      });
    });

    describe('Quando existe o produto cadastrado no BD', () => {

      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsServices, 'getById').resolves(productById);
      });

      after(() => {
        productsServices.getById.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await productsController.getById(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um objeto contendo o produto', async () => {
        await productsController.getById(req, res, next);

        expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });
});
