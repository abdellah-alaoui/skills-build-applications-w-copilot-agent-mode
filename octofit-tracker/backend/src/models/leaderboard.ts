import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry {
  user: mongoose.Types.ObjectId;
  score: number;
  rank: number;
}

export interface ILeaderboard extends Document {
  generatedAt: Date;
  entries: ILeaderboardEntry[];
}

const LeaderboardEntrySchema: Schema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const LeaderboardSchema: Schema = new Schema<ILeaderboard>({
  generatedAt: { type: Date, default: () => new Date() },
  entries: { type: [LeaderboardEntrySchema], default: [] },
});

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
