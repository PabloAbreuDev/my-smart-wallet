import { IUser } from "../mongodb/models/user";

export type WithId<T> = { id: string } & T;

export interface BaseRepository<T> {
  create(data: Partial<T>): Promise<WithId<T>>;
  findOne(options: Partial<T>): Promise<WithId<T> | undefined>;
  find(options: Partial<T>): Promise<WithId<T>[]>;
}

export abstract class Repository<T> implements BaseRepository<T> {
  public abstract create(data: Partial<T>): Promise<WithId<T>>;
  public abstract findOne(
    options: Partial<T>
  ): Promise<WithId<T> | undefined>;
  public abstract find(filter: Partial<T>): Promise<WithId<T>[]>;
}

export interface IUserRepository extends BaseRepository<IUser>{
  verifyAccount(verifyCode: string): Promise<WithId<IUser>>
}