import { Router } from 'express';
import * as AuthService from '../services/authService';

const router = Router();
router.post('/login', async (req, res) => {
  console.log(req.body);
  const result = await AuthService.login(req.body);
  res.send(result);
});

export default router;
