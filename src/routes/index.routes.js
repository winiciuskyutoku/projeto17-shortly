import { Router } from "express";
import userRouter from "./user.routes.js";
import urlRouter from "./urls.routes.js";
import rankRouter from "./rank.routes.js";

const router = Router()

router.use(userRouter)
router.use(urlRouter)
router.use(rankRouter)

export default router