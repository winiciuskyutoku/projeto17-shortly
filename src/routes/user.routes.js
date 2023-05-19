import { Router } from "express";
import { signUpSchema } from "../schemas/user.schema.js";
import { signUpValidation } from "../middlewares/signUpValidation.middleware.js";
import { signUp } from "../controllers/user.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const userRouter = Router()

userRouter.use("/signup", validateSchema(signUpSchema), signUpValidation, signUp)

export default userRouter