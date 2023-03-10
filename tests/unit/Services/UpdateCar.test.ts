import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const inputCarIdUpdted = {
  _id: '63eaaac4bdec4079a2e41f77',
  model: 'Gol',
  year: 1995,
  color: 'Read',
  status: true,
  buyValue: 17.99,
  doorsQty: 4,
  seatsQty: 4,
};

describe('Deveria atualizar um carro pelo id', function () {
  it('Deveria atualizar um carro com SUCESSO pelo seu ID', async function () {
    // Arrange
    const carIdOutput = new Car(inputCarIdUpdted);
    const { _id: id, ...input } = inputCarIdUpdted;
        
    sinon.stub(Model, 'findById').resolves(inputCarIdUpdted);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(inputCarIdUpdted);
    
    // Act
    const service = new CarService();
    const result = await service.updateCar('63319d80feb9f483ee823ac5', input);
        
    // Assert
    expect(result).to.be.deep.equal(carIdOutput);
    
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar atualizar um carro com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.updateCar('63319d80feb9f483ee823a3d', { model: 'Ferrari' });
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal('Car not found');
    }

    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar atualizar um carro com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.updateCar('6', { });
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});