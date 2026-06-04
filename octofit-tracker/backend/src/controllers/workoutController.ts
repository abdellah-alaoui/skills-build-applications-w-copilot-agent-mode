import { Request, Response } from 'express';
import * as service from '../services/workoutService';

export const listWorkouts = async (_req: Request, res: Response) => {
  try {
    const workouts = await service.getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { title, duration, calories, date } = req.body;
    if (!title || !duration) {
      return res.status(400).json({ error: 'title and duration are required' });
    }

    const created = await service.createWorkout({ title, duration, calories, date });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create workout' });
  }
};
