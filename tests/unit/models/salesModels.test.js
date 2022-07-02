const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../database/connection');
const salesModels = require('../../../models/saleModels');

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

describe('Teste da camada saleModels', () => {

  describe('Ao chamar "getAll" para listar todas as vendas', () => {

    describe('Quando não existem vendas cadastradas no BD', () => {

      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const sales = await salesModels.getAll();

        expect(sales).to.be.empty;
        expect(sales).to.be.an('array');
      });
    });

    describe('Quando existem vendas cadastradas no BD', () => {

      before(async () => {
        const execute = [allSales];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo as vendas', async () => {
        const sales = await salesModels.getAll();

        expect(sales).not.to.be.empty;
        expect(sales).to.be.an('array');
        sales.forEach(sale => expect(sale).to.be.an('object'));
      });
    });
  });

  describe('Ao chamar "getById" para listar uma venda através do seu Id', () => {

    describe('Quando não existe a venda cadastrada no BD', () => {

      before(async () => {
        const execute = [[]];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array vazio', async () => {
        const sales = await salesModels.getAll();

        expect(sales).to.be.empty;
        expect(sales).to.be.an('array');
      });
    });

    describe('Quando existe a venda cadastrada no BD', () => {

      before(async () => {
        const execute = [saleById];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Responde a requisição retornando um array de objetos contendo a venda', async () => {
        const sale = await salesModels.getById(ID);

        expect(sale).not.to.be.empty;
        expect(sale).to.be.an('array');
        sale.forEach(sale => expect(sale).to.be.an('object'));
      });
    });
  });
});
