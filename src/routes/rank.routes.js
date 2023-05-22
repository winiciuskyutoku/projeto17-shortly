import { Router } from "express";
import { getRanking } from "../controllers/rank.controllers.js";

const rankRouter = Router()

rankRouter.get("/ranking",  getRanking)

export default rankRouter