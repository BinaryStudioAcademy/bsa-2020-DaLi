import { Router } from 'express';
import * as AuthService from '../services/authService';

const router = Router();

router.post('/login', async (req, res) => {
  const result = await AuthService.login(req.body);
  res.send(result);
});

router.post('/register', async (req, res) => {
  const result = await AuthService.register(req.body);
  res.send(result);
});

router.get('/user', async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.getUserByToken(token);
  res.send(result);
});

export default router;
