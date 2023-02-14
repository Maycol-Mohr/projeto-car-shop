import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();
    const motorcycleArray = motorcycles.map((motorcycle) =>
      this.createMotorcycleDomain(motorcycle));
    return motorcycleArray;
  }

  public async getMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findMotorcycleById(id);
    if (motorcycle === null) {
      throw new Error('Motorcycle not found');
    }
    const motorcycleId = new Motorcycle(motorcycle);
    return motorcycleId;
  }

//   public async updateCar(id: string, newCar: Partial<ICar>) {
//     const carODM = new CarODM();
//     const car = await carODM.findCarsById(id);
//     if (car === null) {
//       throw new Error('Car not found');
//     }
//     const carUpdated = await carODM.updateCar(id, newCar);
//     return this.createCarDomain(carUpdated);
//   }
}

export default MotorcycleService;