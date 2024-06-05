import { getAll, getSpots }  from "../controllers/mapControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);
router.get("/data/spots", getSpots);

export default router;