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

describe('Deveria atualizar uma moto pelo id', function () {
  it('Deveria atualizar uma moto com SUCESSO pelo seu ID', async function () {
    // Arrange
    const motorcycleIdOutput = new Motorcycle(inputMotorcycleIdUpdted);
    const { _id: id, ...input } = inputMotorcycleIdUpdted;
        
    sinon.stub(Model, 'findById').resolves(inputMotorcycleIdUpdted);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(inputMotorcycleIdUpdted);
    
    // Act
    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('63319d80feb9f483ee823ac5', input);
        
    // Assert
    expect(result).to.be.deep.equal(motorcycleIdOutput);
    
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar atualizar uma moto com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle('63319d80feb9f483ee823a3d', { model: 'BMW' });
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }

    sinon.restore();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('Deveria lancar erro ao tentar atualizar uma motot com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.updateMotorcycle('6', { });
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});