import z from "zod";

const loginSchemaValidator = z.object({
    email: z.string().min(3).max(255).email(),
    password: z.string().min(3).max(255)
});

const registerSchemaValidator = z.object({
    name: z.string().min(3).max(255),
    email: z.string().min(3).max(255).email(),
    password: z.string().min(3).max(255)
});

export { loginSchemaValidator, registerSchemaValidator };