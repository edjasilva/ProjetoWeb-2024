import { getAll, getNonSpot, getByIdNon, getByCategoryNon, getByCategoryCom, getByIdCom, getComSpot } from '../controllers/spotsControllers.js';
import {Router} from 'express';



const router= Router();
router.get("/", getAll);
router.get('/non-commercial/:id', getByIdNon);
router.get('/categories/non-commercial', getByCategoryNon);
router.get("/spots-Non", getNonSpot);
router.get('/commercial/:id', getByIdCom);
router.get('/categories/commercial', getByCategoryCom);
router.get("/spots-Com", getComSpot);



export default router;