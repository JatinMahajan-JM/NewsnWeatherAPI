import { Router } from "express";
import { newsController, weatherNews } from "../controllers/accessController";
import authenticate from "../middlewares/is-auth";
const router = Router()

router.get("/news", authenticate, newsController);
router.get("/weather", weatherNews);

export default router;
