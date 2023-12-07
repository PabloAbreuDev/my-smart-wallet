import { IUser } from "../../models/user";

export type WithId<T> = { id: string } & T;

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseValidationError extends DatabaseError {}

export class DatabaseUnknownClientError extends DatabaseError {}

export class DatabaseInternalError extends DatabaseError {}

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

export interface IUserRepository extends BaseRepository<IUser>{}