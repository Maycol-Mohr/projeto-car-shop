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

  //   public async getAllCars() {
  //     const carODM = new CarODM();
  //     const cars = await carODM.find();
  //     const carArray = cars.map((car) =>
  //       this.createCarDomain(car));
  //     return carArray;
  //   }

  //   public async getCarById(id: string) {
  //     const carODM = new CarODM();
  //     const car = await carODM.findCarsById(id);
  //     if (car === null) {
  //       throw new Error('Car not found');
  //     }
  //     const carId = new Car(car);
  //     return carId;
  //   }

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