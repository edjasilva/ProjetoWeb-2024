import { getAll, getByCategoryNon } from "../controllers/nonComSpotControllers.js";
import { Router } from "express";

const router= Router();
router.get("/", getAll);
router.get('/categories/non-commercial', getByCategoryNon);

export default router;