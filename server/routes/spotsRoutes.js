import { getAllNonSpot, getByIdNon, getByCategoryNon, getByCategoryCom, getByIdCom, getAllComSpot } from '../controllers/spotsControllers.js';
import {Router} from 'express';



const router= Router();
router.get("/all-non-comercial", getAllNonSpot);
router.get('/non-commercial/:id', getByIdNon);
router.get('/categories/non-commercial', getByCategoryNon);
router.get("/all-commercial", getAllComSpot);
router.get('/commercial/:id', getByIdCom);
router.get('/categories/commercial', getByCategoryCom);

export default router;