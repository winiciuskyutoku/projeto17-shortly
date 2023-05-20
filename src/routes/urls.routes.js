import { Router } from "express";
import { getUrl, shortenUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { getValidateUrl, validateUrl } from "../middlewares/urlValidation.middleware.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlSchema) , authValidation , validateUrl ,shortenUrl)
urlRouter.get("/urls/:id", getValidateUrl ,getUrl)

export default urlRouter