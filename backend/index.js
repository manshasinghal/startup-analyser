import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoute from './routes/analyzeRoute.js';
import roadmapRoute from './routes/roadmapRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', analyzeRoute);
app.use('/api', roadmapRoute);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
