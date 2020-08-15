import { Router } from 'express';
import * as AuthService from '../services/authService';

const router = Router();

router.post('/login', async (req, res) => {
  const { status, response } = await AuthService.login(req.body);
  debugger;
  res.status(status).json(response);
});

router.post('/register', async (req, res) => {
  const { status, response } = await AuthService.register(req.body);
  res.status(status).json(response);
});

router.get('/user', async (req, res) => {
  debugger;
  const token = req.headers.authorization;
  const { status, response } = await AuthService.getUserByToken(token);
  res.status(status).json(response);
});

export default router;
