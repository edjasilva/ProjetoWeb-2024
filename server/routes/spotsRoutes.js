import { getAll, getNonSpot, getByIdNon, getByCategoryNon } from '../controllers/spotsControllers.js';
import {Router} from 'express';



const router= Router();
router.get("/", getAll);
router.get('/non-commercial/:id', getByIdNon);
router.get('/categories/non-commercial', getByCategoryNon);
router.get("/spots-Non", getNonSpot);

export default router;