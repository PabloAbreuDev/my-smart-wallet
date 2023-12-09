import { IConfirmAccountUseCase } from "../../use-cases/confirm-account";
import { ICreateUserWithEmailUseCase } from "../../use-cases/create-user-with-email";
import myContainer from "./container";
import { TYPES } from "./types";

export const createUserWithEmail = myContainer.get<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmailUseCase)
export const confirmAccount = myContainer.get<IConfirmAccountUseCase>(TYPES.ConfirmAccountUseCase)