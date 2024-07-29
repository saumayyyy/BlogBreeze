import z from "zod";

export const signUpValidation = z.object({
    email: z.string().email(),
    password:z.string().min(6),
    name: z.string().optional()
})

export type signUpValidation = z.infer<typeof signUpValidation>


export const signInValidation = z.object({
    email: z.string().email(),
    password:z.string().min(6),
})
//this type is exported to give type to the body that we are going to parse
export type signInValidation = z.infer<typeof signInValidation>

export const createBlogInput = z.object({
    title: z.string(),
    content:z.string(),
})

export type createBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title:z.string(),
    Description: z.string(),
    id : z.number()
})

export type updateBlogInput = z.infer<typeof updateBlogInput>