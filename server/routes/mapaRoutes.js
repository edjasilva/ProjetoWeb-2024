import { getAll }  from "../controllers/mapaControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;