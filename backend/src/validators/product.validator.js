import z from "zod";

const productSchemaValidator = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    price: z.number().min(0),
    stock: z.number().min(0),
    category: z.string().min(3).max(255)
});

const updateProductSchemaValidator = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    price: z.number().min(0),
    stock: z.number().min(0),
    category: z.string().min(3).max(255)
});

export { productSchemaValidator, updateProductSchemaValidator };