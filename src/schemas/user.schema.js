import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().trim().required().max(20),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(3).required(),
    confirmPassword: joi.string().trim().min(3).required()
})

export const signInSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(3).required()
})