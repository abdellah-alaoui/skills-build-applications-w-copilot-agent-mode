import { Workout, IWorkout } from '../models/workout';

export const getAllWorkouts = async (): Promise<IWorkout[]> => {
  return Workout.find().sort({ date: -1 }).exec();
};

export const createWorkout = async (data: Partial<IWorkout>): Promise<IWorkout> => {
  const workout = new Workout(data);
  return workout.save();
};
