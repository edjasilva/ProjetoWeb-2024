import { getAll }  from "../controllers/faqControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;