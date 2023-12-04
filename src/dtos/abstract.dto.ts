import { ZodError, ZodType, z } from "zod"
import { ValidationError } from "../errors/validation.error";
import { AppError } from "../errors/application.error";


export abstract class AbstractDTO<Schema extends ZodType>{
    protected data: z.infer<Schema>;

    public constructor(data: Record<string, unknown>){
        this.validate(data)
    }

    protected abstract rules(): Schema;

    public getAll(): z.infer<Schema>{
        return this.data
    }

    public get<Key extends keyof z.infer<Schema>>(key: Key){
        return this.data[key]
    }

    private validate(data:Record<string, unknown> ){
        try {
           this.data = this.rules().parse(data)
        }catch(error){
            console.log(error)
            if(error instanceof ZodError){
                throw new ValidationError(error)
            }
            throw new AppError('Internal server error', 500)
        }
    }
}

