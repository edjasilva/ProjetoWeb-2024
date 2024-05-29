import { getAll } from "../controllers/termosControllers.js";
import { Router } from "express";

const router= Router();
router.get("/", getAll);

export default router;