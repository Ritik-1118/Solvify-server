const { z } = require("zod");

const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required. "})
    .trim()
    .email({message: "Invalid email address."})
    .min(3,{ message: "email must be at least 3 chars."})
    .max(255,{message: "email must be less than 255 chars."}),
    password:   z
    .string({required_error: "Password is required. "})
    .trim()
    .min(6,{ message: "Password must be at least 6 chars."})
    .max(255,{message: "Password must be less than 255 chars."}),
})

const signupSchema = z.object({
    userName:   z
    .string({required_error: "Name is required. "})
    .trim()
    .min(3,{ message: "name must be at least 3 chars."})
    .max(255,{message: "name must be less than 255 chars."}),
    email: z
    .string({required_error: "Email is required. "})
    .trim()
    .email({message: "Invalid email address."})
    .min(3,{ message: "email must be at least 3 chars."})
    .max(255,{message: "email must be less than 255 chars."}),
    phone:   z
    .string({required_error: "Phone is required. "})
    .trim()
    .min(10,{ message: "Phone must be at least 10 chars."})
    .max(20,{message: "Phone must be less than 20 chars."}),
    password:   z
    .string({required_error: "Password is required. "})
    .trim()
    .min(6,{ message: "Password must be at least 6 chars."})
    .max(255,{message: "Password must be less than 255 chars."}),
});

module.exports = {signupSchema,loginSchema};