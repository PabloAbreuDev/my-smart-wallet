import { z } from "zod";

const createDepotRequestSchema = z.object({
  name: z.string({
    invalid_type_error: "Name need to be an string",
    required_error: "Name is required",
  }),
  description: z.string({
    invalid_type_error: "Description need to be an string",
    required_error: "Description is reuqired",
  }),
  user_id: z.string({
    invalid_type_error: "user_id need to be an string",
    required_error: "user_id is reuqired",
  }),
});