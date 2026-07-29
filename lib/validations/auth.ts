import {z} from "zod";
export const loginSchema = z.object({
    email : z.string()
    .min(1, {message : "Email is required"})
    .email({message : "Invalid email address"}),

    password : z.string().min(5, {message : "Password must be at least 5 characters"})
})

export type LoginInput = z.infer<typeof loginSchema>


export const registerSchema = z.object({
    name : z.string().min(4, {message : "Name must be at least 4 characters."}),
    email : z.string().min(1, {message:"Email is required"}).email({message : "Invalid email address."}),
    password : z.string().min(5, {message : "Password must be at least 5 characters."}),
    phoneNumber : z.string().min(1, {message:"Email is required"}),
    role: z.enum(["ADMIN", "PROVIDER", "CUSTOMER"], {message : "Please select a role."}),
    address: z.string().min(3, {message : "Address is required"})

})

export type RegisterInput = z.infer<typeof registerSchema>