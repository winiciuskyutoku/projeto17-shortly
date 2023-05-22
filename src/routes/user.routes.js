import { Router } from "express";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";
import { signUpValidation, singInValidation } from "../middlewares/userValidation.middleware.js";
import { getUsers, signIn, signUp } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.post("/signup", validateSchema(signUpSchema), signUpValidation, signUp)
userRouter.post("/signin", validateSchema(signInSchema), singInValidation, signIn)
userRouter.get("/users/me", authValidation ,getUsers)

export default userRouter