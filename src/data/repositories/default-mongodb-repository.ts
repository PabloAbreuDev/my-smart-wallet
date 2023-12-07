import { Model } from "mongoose";
import { Repository, WithId } from ".";

export interface BaseModel {}
export abstract class DefaultMongoDBRepository<
  T extends BaseModel
> extends Repository<T> {

  constructor(private model: Model<T>) {
    super();
  }

  public async create(data: Partial<T>): Promise<WithId<T>> {
    try {
        const model = new this.model(data);
        const createdData = await model.save();
        return createdData.toJSON() as WithId<T>;
    }catch(err){
        throw new Error()
    }
  }

  public async findOne(options: Partial<T>) {
    const data = await this.model.findOne(options);
    return data?.toJSON() as WithId<T>;
  }

  public async find(filter: Partial<T>): Promise<WithId<T>[]> {
    const data = await this.model.find(filter);
    return data.map((d) => d.toJSON() as WithId<T>);
  }
}
