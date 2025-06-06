import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const users: { email: string; passwordHash: string }[] = [];

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (users.find(u => u.email === email)) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/authtest', (req: Request, res: Response) => {
  res.json({ message: 'Auth test successful' });
});

export default router;