console.log("✅ Express server starting...");
import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 3000;
app.get('/ping', (req, res) => {
  res.send('pong');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});