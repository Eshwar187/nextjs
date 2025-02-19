import {z} from 'zod'
export const usernameValidation=z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username can have a maximum of 20characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores')
export const passwordValidation=z.object({
    username:usernameValidation,
    email:z.string().email({message:"Invalid email address"}),
    password: z.string().min(6, {message:'Password must be at least 6 characters long'})
})