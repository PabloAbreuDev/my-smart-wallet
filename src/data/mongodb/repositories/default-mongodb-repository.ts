import { Model, Error } from "mongoose";
import {
  Repository,
  WithId,
} from "../../repositories";
import { injectable } from "inversify";

export interface BaseModel {}

@injectable()
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
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async findOne(options: Partial<T>) {
    try {
      const data = await this.model.findOne(options);
      return data?.toJSON() as WithId<T>;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async find(filter: Partial<T>): Promise<WithId<T>[]> {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON() as WithId<T>);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
