import { getAll, getCountByCategory, getRatingByCategory, getCountComCategory,  getAvgValue} from '../controllers/admin/dashboardControllers.js';
import {Router} from 'express';

const router = Router();
router.get("/", getAll);
router.get("/data/spots-by-category", getCountByCategory);
router.get("/data/spots-by-rating", getRatingByCategory);
router.get("/data/spots-by-comCategory", getCountComCategory);
router.all("/data/spots-by-avgValue", getAvgValue)

export default router;