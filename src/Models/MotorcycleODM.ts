import { Model, Schema, model, models, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

const INVALID_MONGO_ID = 'Invalid mongo id';
  
class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;
  
  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async find(): Promise<IMotorcycle[]> {
    return this.model.find();
  }

  public async findMotorcycleById(id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_MONGO_ID);
    }
    const findId = await this.model.findById(id);
    return findId;
  }

  public async updateMotorcycle(
    _id: string, 
    newMotorcycle: Partial<IMotorcycle>,
  ): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) {
      throw new Error(INVALID_MONGO_ID);
    }
    const findId = await this.model.findByIdAndUpdate({ _id }, { ...newMotorcycle }, { new: true });
    return findId;
  }

  public async deleteMotorcycle(id: string): Promise<void | null> {
    if (!isValidObjectId(id)) {
      throw new Error(INVALID_MONGO_ID);
    }
    await this.model.deleteOne({ id });
  }
}
  
export default MotorcycleODM;