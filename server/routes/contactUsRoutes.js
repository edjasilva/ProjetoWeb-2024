import { getAll } from "../controllers/contactUsControllers.js";
import {Router} from 'express';

const router = Router();
router.get("/", getAll);

export default router;