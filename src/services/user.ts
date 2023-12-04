export interface IUserService{
    createUser(): Promise<void>
}

export class UserService implements IUserService{
    constructor(){}
    async createUser(){
        console.log("User created")
    }
}