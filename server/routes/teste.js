
import {getAll} from '../controllers/testeControllers.js';
import {Router} from 'express';

const router= Router();

router.get("/", getAll);




export default router;



