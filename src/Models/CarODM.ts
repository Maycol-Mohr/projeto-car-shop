// import { Model, Schema, model, models, isValidObjectId } from 'mongoose';
import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';
  
class CarODM extends AbstractODM<ICar> {
  // private schema: Schema;
  // private model: Model<ICar>;
  
  constructor() {
    const schema = new Schema<ICar>({
      // this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    // this.model = models.Car || model('Car', this.schema);
    super(schema, 'Car');
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findCarsById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const findId = await this.model.findById(id);
    return findId;
  }

  public async updateCar(_id: string, newCar: Partial<ICar>): Promise<ICar | null> {
    if (!isValidObjectId(_id)) {
      throw new Error('Invalid mongo id');
    }
    const findId = await this.model.findByIdAndUpdate({ _id }, { ...newCar }, { new: true });
    return findId;
  }
}
  
export default CarODM;