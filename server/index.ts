import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPortfolioContent, savePortfolioContent } from '../lib/portfolio-service';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/portfolio', async (_req, res) => {
  const content = await getPortfolioContent();
  res.json(content);
});

app.post('/api/portfolio', async (req, res) => {
  try {
    const saved = await savePortfolioContent(req.body);
    res.json(saved);
  } catch {
    res.status(400).json({ error: 'Invalid payload' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
