import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotoService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  //   public async getAllCars() {
  //     const cars = await this.service.getAllCars();
  //     return this.res.status(200).json(cars);
  //   }

  //   public async getCarsById() {
  //     const { id } = this.req.params;
  //     try {
  //       const car = await this.service.getCarById(id);
  //       return this.res.status(200).json(car);
  //     } catch (error) {
  //       return this.res.status(404).json({ message: (error as Error).message });
  //     }
  //   }

//   public async updateCar() {
//     const { id } = this.req.params;
//     try {
//       const car = await this.service.updateCar(id, this.req.body);
//       return this.res.status(200).json(car);
//     } catch (error) {
//       return this.res.status(404).json({ message: (error as Error).message });
//     }
//   }
}
  
export default MotorcycleController;