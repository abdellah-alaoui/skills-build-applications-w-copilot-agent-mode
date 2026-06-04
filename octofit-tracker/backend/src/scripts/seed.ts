/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Activity } from '../models/activity';
import { Workout } from '../models/workout';
import { Leaderboard } from '../models/leaderboard';

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(mongoUri, { autoIndex: true });

  // Clear existing data
  await Promise.all([
    Team.deleteMany({}),
    User.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Red Rockets' });
  const teamB = await Team.create({ name: 'Blue Whales' });

  // Create users
  const users = await User.create([
    { name: 'Alice Gomez', email: 'alice@example.com', team: teamA._id },
    { name: 'Bob Martin', email: 'bob@example.com', team: teamA._id },
    { name: 'Cara Singh', email: 'cara@example.com', team: teamB._id },
    { name: 'Dan Lee', email: 'dan@example.com', team: teamB._id },
  ]);

  // Attach members to teams
  teamA.members = [users[0]._id, users[1]._id];
  teamB.members = [users[2]._id, users[3]._id];
  await teamA.save();
  await teamB.save();

  // Create activities (realistic sample data)
  const activitiesData = [
    { user: users[0]._id, type: 'running', duration: 30, calories: 300, date: new Date() },
    { user: users[1]._id, type: 'cycling', duration: 45, calories: 450, date: new Date() },
    { user: users[2]._id, type: 'yoga', duration: 60, calories: 200, date: new Date() },
    { user: users[3]._id, type: 'swimming', duration: 40, calories: 400, date: new Date() },
    { user: users[0]._id, type: 'strength', duration: 50, calories: 350, date: new Date() },
  ];

  const activities = await Activity.create(activitiesData);

  // Create workouts
  const workouts = await Workout.create([
    { title: 'Morning Run', duration: 30, calories: 300, date: new Date(), },
    { title: 'Evening Ride', duration: 45, calories: 450, date: new Date(), },
  ]);

  // Update user aggregates
  for (const u of users) {
    const userActivities = activities.filter(a => a.user.toString() === u._id.toString());
    const totalCalories = userActivities.reduce((s, a) => s + a.calories, 0);
    const totalDuration = userActivities.reduce((s, a) => s + a.duration, 0);
    u.totalCalories = totalCalories;
    u.totalDuration = totalDuration;
    await u.save();
  }

  // Compute a simple leaderboard (top users by calories)
  const sorted = users
    .map(u => ({ user: u._id, score: u.totalCalories ?? 0 }))
    .sort((a, b) => b.score - a.score);

  const entries = sorted.map((s, i) => ({ user: s.user, score: s.score, rank: i + 1 }));
  await Leaderboard.create({ entries });

  console.log('Seed complete:');
  console.log(`  teams: ${await Team.countDocuments()}`);
  console.log(`  users: ${await User.countDocuments()}`);
  console.log(`  activities: ${await Activity.countDocuments()}`);
  console.log(`  workouts: ${await Workout.countDocuments()}`);
  console.log(`  leaderboard: ${await Leaderboard.countDocuments()}`);

  await mongoose.connection.close();
  console.log('Disconnected from DB');
}

seed().catch(err => {
  console.error('Seeding error', err);
  process.exit(1);
});
