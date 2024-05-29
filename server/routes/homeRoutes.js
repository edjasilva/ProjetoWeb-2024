import { getAll }  from "../controllers/homeControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;