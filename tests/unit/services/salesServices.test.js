const sinon = require('sinon');
const { expect } = require('chai');
const salesModels = require('../../../models/saleModels');
const salesServices = require('../../../services/saleServices');

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

const ID = 1;

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

describe('Teste da camada saleServices', () => {

  describe('Ao chamar "getAll" para listar todas as vendas', () => {

    describe('Quando não existem vendas cadastrados no BD', () => {

      before(() => {
        sinon.stub(salesModels, 'getAll').resolves([]);
      });

      after(() => {
        salesModels.getAll.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const sales = await salesServices.getAll();

        expect(sales).to.be.empty;
        expect(sales).to.be.an('array');
      });
    });

    describe('Quando existem vendas cadastrados no BD', () => {

      before(() => {
        sinon.stub(salesModels, 'getAll').resolves(allSales);
      });

      after(() => {
        salesModels.getAll.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo as vendas', async () => {
        const sales = await salesServices.getAll();

        expect(sales).not.to.be.empty;
        expect(sales).to.be.an('array');
        sales.forEach(sale => expect(sale).to.be.an('object'));
      });
    });
  });

  describe('Ao chamar "getById" para listar uma venda através do seu Id', () => {

    describe('Quando não existe a venda cadastrada no BD', () => {
      const err = { code: 404, message: "Sale not found" };

      before(() => {
        sinon.stub(salesModels, 'getById').throws(err);
      });

      after(() => {
        salesModels.getById.restore();
      });

      it('Responde a requisição retornando um erro 404 "Sale not found"', async () => {
        try {
          await salesServices.getById(ID);
        } catch (error) {
          expect(error).to.deep.equal(err);
        }
      });
    });

    describe('Quando existe a venda cadastrada no BD', () => {

      before(() => {
        sinon.stub(salesModels, 'getById').resolves(saleById);
      });

      after(() => {
        salesModels.getById.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo a venda', async () => {
        const sale = await salesServices.getById(ID);

        expect(sale).not.to.be.empty;
        expect(sale).to.be.an('array');
        sale.forEach(sale => expect(sale).to.be.an('object'));
      });
    });
  });
});
