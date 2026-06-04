import { Router } from 'express';
import * as controller from '../controllers/workoutController';

const router = Router();

router.get('/', controller.listWorkouts);
router.post('/', controller.createWorkout);

export default router;
