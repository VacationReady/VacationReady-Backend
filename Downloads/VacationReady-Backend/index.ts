import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
