import { Request, Response } from "express";
import { IUserService } from "../services/user";

export class UserController {
    constructor(
        private readonly userService: IUserService
    ){}

    async createUser(req: Request, res: Response){
        try {
            await this.userService.createUser()
        }catch(err){
            console.log(err)
        }
    }
}