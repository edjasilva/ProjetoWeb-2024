import { getAll } from "../controllers/supportControllers.js";
import { Router } from "express";

const router= Router();
router.get("/", getAll);

export default router;


