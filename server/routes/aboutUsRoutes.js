import { getAll } from '../controllers/aboutUsControllers.js';
import {Router} from 'express';



const router= Router();
router.get("/", getAll);

export default router;