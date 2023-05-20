import { Router } from "express";
import { deleteUrl, getShortUrl, getUrl, shortenUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schema.js";
import { getValidateUrl, validateDeleteUrl, validateShortUrl, validateUrl } from "../middlewares/urlValidation.middleware.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlSchema) , authValidation , validateUrl ,shortenUrl)
urlRouter.get("/urls/:id", getValidateUrl ,getUrl)
urlRouter.get("/urls/open/:shortUrl",  validateShortUrl ,getShortUrl)
urlRouter.delete("/urls/:id", authValidation , validateDeleteUrl, deleteUrl)

export default urlRouter