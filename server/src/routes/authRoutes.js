import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as AuthService from '../services/authService';
import * as UserService from '../services/userService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';

const router = Router();

router.post(
  '/login',
  authenticationMiddleware,
  asyncHandler(async (req, res) => {
    const response = await AuthService.login(req.user);
    res.send(response);
  })
);

router.post(
  '/register',
  registrationMiddleware,
  asyncHandler(async (req, res) => {
    const response = await AuthService.register(req.body);
    res.send(response);
  })
);

router.get(
  '/user',
  asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    const response = await AuthService.autoLogin(req.user.id, token);
    res.send(response);
  })
);

router.get(
  '/isFirstLogIn',
  asyncHandler(async (req, res) => {
    const response = await UserService.getUsers();
    res.send(JSON.stringify(!response.length));
  })
);

export default router;
