import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotoService';

const inputMotorcycleArray = [
  {
    model: 'BMW',
    year: 2022,
    color: 'Vermelho',
    status: true,
    buyValue: 10000000,
    category: 'Street',
    engineCapacity: 600,
    id: '63319d80feb9f483ee823ac5',
  },
  {
    model: 'Mercedes',
    year: 2020,
    color: 'Azul',
    status: false,
    buyValue: 10000000,
    category: 'Street',
    engineCapacity: 500,
    id: '63319d80feb9f483ee823666',
  },
];

const inputMotorcycleId = {
  _id: '63eaaac4bdec4079a2e41f77',
  model: 'Mercedes',
  year: 2020,
  color: 'Azul',
  status: false,
  buyValue: 10000000,
  category: 'Street',
  engineCapacity: 500,
};

const inputMotorcycleInvalidId = [
  {
    model: 'Mercedes',
    year: 2020,
    color: 'Azul',
    status: false,
    buyValue: 10000000,
    category: 'Street',
    engineCapacity: 500,
    id: '633',
  },
];

describe('Deveria buscar todas as motos', function () {
  it('Deveria buscar todas as motos com SUCESSO', async function () {
    // Arrange
    const motorcycleOutput = inputMotorcycleArray.map((item) => new Motorcycle(item));
    
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getAllMotorcycles();
    
    // Assert
    expect(result).to.be.deep.equal(motorcycleOutput);

    sinon.restore();
  });

  it('Deveria buscar uma moto com SUCESSO pelo seu ID', async function () {
    // Arrange
    const motorcycleIdOutput = new Motorcycle(inputMotorcycleId);
    
    sinon.stub(Model, 'findById').resolves(inputMotorcycleId);

    // Act
    const service = new MotorcycleService();
    const result = await service.getMotorcycleById('63319d80feb9f483ee823ac5');
    
    // Assert
    expect(result).to.be.deep.equal(motorcycleIdOutput);

    sinon.restore();
  });

  it('Deveria lancar erro de uma moto com id inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById('63319d80feb9f483ee823a3d');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }

    sinon.restore();
  });

  it('Deveria lancar erro de uma moto com id invalido', async function () {
    sinon.stub(Model, 'findById').resolves(inputMotorcycleInvalidId);

    try {
      const service = new MotorcycleService();
      await service.getMotorcycleById('633');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }

    sinon.restore();
  });
});