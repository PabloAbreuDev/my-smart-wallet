import { z } from "zod";
import { AbstractDTO } from "../abstract.dto";

const createUserResponseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
})


export class CreateUserResponseDTO extends AbstractDTO<typeof createUserResponseSchema>{
    protected rules() {
       return createUserResponseSchema
    }
}