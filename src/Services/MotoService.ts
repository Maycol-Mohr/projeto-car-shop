import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

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
      throw new Error(MOTORCYCLE_NOT_FOUND);
    }
    const motorcycleId = new Motorcycle(motorcycle);
    return motorcycleId;
  }

  public async updateMotorcycle(id: string, newMotorcycle: Partial<IMotorcycle>) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findMotorcycleById(id);
    if (motorcycle === null) {
      throw new Error(MOTORCYCLE_NOT_FOUND);
    }
    const motorcycleUpdated = await motorcycleODM.updateMotorcycle(id, newMotorcycle);
    return this.createMotorcycleDomain(motorcycleUpdated);
  }

  public async deleteMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findMotorcycleById(id);
    if (motorcycle === null) {
      throw new Error(MOTORCYCLE_NOT_FOUND);
    }
    await motorcycleODM.deleteMotorcycle(id);
  }
}

export default MotorcycleService;