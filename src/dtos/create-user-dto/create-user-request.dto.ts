import { z } from "zod";
import { AbstractDTO } from "../abstract.dto";

const createUserRequestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
})


export class CreateUserRequestDTO extends AbstractDTO<typeof createUserRequestSchema>{
    protected rules() {
       return createUserRequestSchema
    }
}