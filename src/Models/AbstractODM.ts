import { Model, Schema, model, models, UpdateQuery, isValidObjectId }
  from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }
  
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const findId = await this.model.findById(id);
    return findId;
  }

  // public async updateCar(_id: string, object: Partial<T>): Promise<T | null> {
  //   if (!isValidObjectId(_id)) {
  //     throw new Error('Invalid mongo id');
  //   }
  //   const findId = await this.model.findByIdAndUpdate({ _id }, { ...object }, { new: true });
  //   return findId;
  // }
  
  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw Error('Invalid Mongo id');
    }
    return this.model.findByIdAndUpdate({ _id: id }, { ...obj } as UpdateQuery<T>, { new: true });
  }

  public async delete(id: string): Promise<void | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid Mongo id');
    }
    await this.model.deleteOne({ id });
  }
}
  
export default AbstractODM;