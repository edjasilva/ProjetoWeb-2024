import { getAll } from '../controllers/blogControllers.js';
import {Router} from 'express';

const router= Router();
router.get("/", getAll);

export default router;