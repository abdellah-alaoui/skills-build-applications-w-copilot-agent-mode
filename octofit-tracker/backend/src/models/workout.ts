import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  duration: number;
  calories?: number;
  date: Date;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() },
});

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
