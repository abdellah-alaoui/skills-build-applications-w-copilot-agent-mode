import express from 'express';
import mongoose from 'mongoose';
import workoutsRouter from './routes/workouts';
import genericRouter from './routes/generic';
import { API_BASE_URL, MONGO_URI, PORT, getServerInfo } from './server';

const app = express();

app.use(express.json());

app.use('/api/workouts', workoutsRouter);
app.use('/api', genericRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

console.log(getServerInfo());

app.listen(PORT, () => {
  console.log(`Backend running on ${API_BASE_URL}`);
});
