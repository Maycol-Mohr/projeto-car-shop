import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

const CAR_NOT_FOUND = 'Car not found';

class CarService {
  // private createCarDomain(car: ICar): Car {
  //   return new Car(car);
  // }

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const carArray = cars.map((car) => this.createCarDomain(car));
    return carArray;
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findCarsById(id);
    if (car === null) {
      throw new Error(CAR_NOT_FOUND);
    }
    const carId = new Car(car);
    return carId;
  }

  public async updateCar(id: string, newCar: Partial<ICar>) {
    const carODM = new CarODM();
    const car = await carODM.findCarsById(id);
    if (car === null) {
      throw new Error(CAR_NOT_FOUND);
    }
    const carUpdated = await carODM.updateCar(id, newCar);
    return this.createCarDomain(carUpdated);
  }

  // public async updateCar(id: string, newCar: Partial<ICar>) {
  //   const carODM = new CarODM();
  //   const carUpdated = await carODM.updateCar(id, newCar);
  //   if (carUpdated === null) {
  //     throw new Error(CAR_NOT_FOUND);
  //   }
  //   return this.createCarDomain(carUpdated);
  // }

  public async deleteCar(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findCarsById(id);
    if (car === null) {
      throw new Error(CAR_NOT_FOUND);
    }
    await carODM.deleteCar(id);
  }
}

export default CarService;