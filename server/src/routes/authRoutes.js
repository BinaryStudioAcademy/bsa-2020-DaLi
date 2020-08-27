import { Router } from 'express';
import * as AuthService from '../services/authService';
import * as UserService from '../services/userService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

const router = Router();

router.post('/login', authenticationMiddleware, async (req, res) => {
  const response = await AuthService.login(req.user);
  res.send(response);
});

router.post('/register', registrationMiddleware, async (req, res) => {
  const response = await AuthService.register(req.body);
  res.send(response);
});

router.get('/user', jwtMiddleware, async (req, res) => {
  const response = await UserService.getUser(req.user.id);
  res.send(response);
});

export default router;
