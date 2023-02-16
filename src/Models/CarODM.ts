// import { Model, Schema, model, models, isValidObjectId } from 'mongoose';
import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

const INVALID_MONGO_ID = 'Invalid mongo id';
  
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
      throw new Error(INVALID_MONGO_ID);
    }
    const findId = await this.model.findById(id);
    return findId;
  }

  public async updateCar(_id: string, newCar: Partial<ICar>): Promise<ICar | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(INVALID_MONGO_ID);
    }
    const findId = await this.model.findByIdAndUpdate({ _id }, { ...newCar }, { new: true });
    return findId;
  }

  public async deleteCar(id: string): Promise<void | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_MONGO_ID);
    }
    await this.model.deleteOne({ id });
  }
}
  
export default CarODM;