import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  duration: number; // minutes
  calories: number;
  date: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date() },
});

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
