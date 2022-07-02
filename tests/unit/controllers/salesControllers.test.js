const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/saleServices');
const salesController = require('../../../controllers/saleControllers');

const allSales = [
  {
    "saleId": 1,
    "date": "2022-07-02T00:46:13.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-07-02T00:46:13.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-07-02T00:46:13.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const saleById = [
  {
    "date": "2022-07-02T00:46:13.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-07-02T00:46:13.000Z",
    "productId": 2,
    "quantity": 10
  }
];

describe('Teste da camada saleControllers', () => {

  describe('Ao chamar "getAll" para listar todas as vendas', () => {
    let req = {}, res = {}, next = {};

    describe('Quando não existem vendas cadastrados no BD', () => {

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesServices, 'getAll').resolves([]);
      });

      after(() => {
        salesServices.getAll.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await salesController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um array vazio', async () => {
        await salesController.getAll(req, res, next);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Quando existem vendas cadastrados no BD', () => {

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesServices, 'getAll').resolves(allSales);
      });

      after(() => {
        salesServices.getAll.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await salesController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um array de objetos contendo as vendas', async () => {
        await salesController.getAll(req, res, next);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Quando ocorre um erro no serviço da API', () => {
      const err = { code: 500, message: "INTERNAL SERVER ERROR" }

      before(() => {
        next = sinon.stub();
        sinon.stub(salesServices, 'getAll').throws(err);
      });

      after(() => {
        salesServices.getAll.restore();
      });

      it('O erro é enviado para o próximo handler de erro', async () => {
        await salesController.getAll(req, res, next);

        expect(next.calledWith(err)).to.be.equal(true);
      });
    });
  });

  describe('Ao chamar "getById" para listar uma venda através do seu Id', () => {
    let req = {}, res = {}, next = {};

    describe('Quando não existe a venda cadastrada no BD', () => {
      const err = { code: 404, message: "Sale not found" };

      before(() => {
        req.params = { id: 1 };
        next = sinon.stub();
        sinon.stub(salesServices, 'getById').throws(err);
      });

      after(() => {
        salesServices.getById.restore();
      });

      it('O erro é enviado para o próximo handler de erro', async () => {
        await salesController.getById(req, res, next);

        expect(next.calledWith(err)).to.be.equal(true);
      });
    });

    describe('Quando existe o produto cadastrado no BD', () => {

      before(() => {
        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesServices, 'getById').resolves(saleById);
      });

      after(() => {
        salesServices.getById.restore();
      });

      it('Responde a requisição retornando um statusCode 200', async () => {
        await salesController.getById(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Responde a requisição retornando um array de objetos contendo a venda', async () => {
        await salesController.getById(req, res, next);

        expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });
});
