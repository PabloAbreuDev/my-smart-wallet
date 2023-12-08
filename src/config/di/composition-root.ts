import { ICreateUserWithEmailUseCase } from "../../use-cases/create-user-with-email";
import myContainer from "./container";
import { TYPES } from "./types";

export const createUserWithEmail = myContainer.get<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmail)