import { SignUpSchema } from "@/schemas";
import * as z from "zod";


export const signUp =  async (values: z.infer<typeof SignUpSchema>) => {
    // TODO: add sign up action logic
    return null
  }