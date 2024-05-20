import { getAll } from '../controllers/spotsControllers.js';
import {Router} from 'express';



const router= Router();
router.get("/", getAll);

export default router;