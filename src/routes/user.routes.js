import { Router } from "express";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";
import { signUpValidation, singInValidation } from "../middlewares/userValidation.middleware.js";
import { signIn, signUp } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const userRouter = Router()

userRouter.post("/signup", validateSchema(signUpSchema), signUpValidation, signUp)
userRouter.post("/signin", validateSchema(signInSchema), singInValidation, signIn)

export default userRouter