import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotoService';

const inputMotorcycleIdUpdted = {
  _id: '63eaaac4bdec4079a2e41f77',
  model: 'BMW',
  year: 2021,
  color: 'Blue',
  status: true,
  buyValue: 1000000,
  category: 'Street',
  engineCapacity: 600,
};

describe('Deveria deletar uma moto pelo id', function () {
  it('Deveria deletar uma moto com SUCESSO pelo seu ID', async function () {
    // Arrange
    const motorcycleIdOutput = new Motorcycle(inputMotorcycleIdUpdted);
        
    sinon.stub(Model, 'findById').resolves(motorcycleIdOutput);
    sinon.stub(Model, 'deleteOne').resolves();
    
    // Act
    const service = new MotorcycleService();
    const result = await service.deleteMotorcycle('63319d80feb9f483ee823ac5');
        
    // Assert
    expect(result).to.be.equal(undefined);
    
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar deletar uma moto com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.deleteMotorcycle('63319d80feb9f483ee823a3d');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }

    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar deletar uma motot com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.deleteMotorcycle('6');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});