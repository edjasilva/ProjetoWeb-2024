import { getAll } from "../controllers/nonComSpot.js";
import { Router } from "express";

const router= Router();
router.get("/", getAll);

export default router;