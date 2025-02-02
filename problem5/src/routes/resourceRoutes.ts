import { Router } from 'express';
import {
  createResourceHandler,
  getAllResourcesHandler,
  getResourceByIdHandler,
  updateResourceHandler,
  deleteResourceHandler
} from '../controllers/resourceController';

const router = Router();

router.post('/resources', createResourceHandler);
router.get('/resources', getAllResourcesHandler);
router.get('/resources/:id', getResourceByIdHandler);
router.put('/resources/:id', updateResourceHandler);
router.delete('/resources/:id', deleteResourceHandler);

export default router;
