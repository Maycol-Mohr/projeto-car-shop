import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;
  
  constructor(car: ICar) {
    super(car.model, car.year, car.color, car.status || false, car.buyValue, car.id);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
   
  public getDoorsQty(): number {
    return this.doorsQty;
  }
  
  public setDoorsQty(value: number) {
    this.doorsQty = value;
  }
  
  public getSeatsQty(): number {
    return this.seatsQty;
  }
  
  public setSeatsQty(value: number) {
    this.seatsQty = value;
  }
}
  
export default Car;