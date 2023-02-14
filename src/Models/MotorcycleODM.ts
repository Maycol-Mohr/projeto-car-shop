import { Model, Schema, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
  
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

  //   public async find(): Promise<ICar[]> {.
  //     return this.model.find();
  //   }

  //   public async findCarsById(id: string): Promise<ICar | null> {
  //     if (!isValidObjectId(id)) {
  //       throw new Error('Invalid mongo id');
  //     }
  //     const findId = await this.model.findById(id);
  //     return findId;
  //   }

//   public async updateCar(_id: string, newCar: Partial<ICar>): Promise<ICar | null> {
//     if (!isValidObjectId(_id)) {
//       throw new Error('Invalid mongo id');
//     }
//     const findId = await this.model.findByIdAndUpdate({ _id }, { ...newCar }, { new: true });
//     return findId;
//   }
}
  
export default MotorcycleODM;