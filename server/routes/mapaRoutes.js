import { getAll }  from "../controllers/mapControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;