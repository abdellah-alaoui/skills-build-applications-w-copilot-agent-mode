import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members?: mongoose.Types.ObjectId[];
  score?: number;
}

const TeamSchema: Schema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, default: 0 },
});

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
