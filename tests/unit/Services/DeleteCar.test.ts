import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const inputCarIdUpdted = {
  _id: '63eaaac4bdec4079a2e41f77',
  model: 'BMW',
  year: 2021,
  color: 'Blue',
  status: true,
  buyValue: 1000000,
  doorsQty: 4,
  seatsQty: 4,
};

describe('Deveria deletar um carro pelo id', function () {
  it('Deveria deletar um carro com SUCESSO pelo seu ID', async function () {
    // Arrange
    const carIdOutput = new Car(inputCarIdUpdted);
        
    sinon.stub(Model, 'findById').resolves(carIdOutput);
    sinon.stub(Model, 'deleteOne').resolves();
    
    // Act
    const service = new CarService();
    const result = await service.deleteCar('63319d80feb9f483ee823ac5');
        
    // Assert
    expect(result).to.be.equal(undefined);
    
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar deletar um carro com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.deleteCar('63319d80feb9f483ee823a3d');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
    }

    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar deletar um carro com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new CarService();
      await service.deleteCar('6');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});