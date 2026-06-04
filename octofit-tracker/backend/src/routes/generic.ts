import { Router } from 'express';
import { list } from '../controllers/genericController';
import * as models from '../models';

const router = Router();

router.get('/users', list('User'));
router.get('/teams', list('Team'));
router.get('/activities', list('Activity'));
router.get('/leaderboard', list('Leaderboard'));

export default router;
