import { getAll } from '../controllers/dashboardControllers.js';
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;