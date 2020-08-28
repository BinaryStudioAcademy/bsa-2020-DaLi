import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as AuthService from '../services/authService';

const router = Router();

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { status, response } = await AuthService.login(req.body);
    res.status(status).json(response);
  })
);

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { status, response } = await AuthService.register(req.body);
    res.status(status).json(response);
  })
);

router.get(
  '/user',
  asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    const { status, response } = await AuthService.getUserByToken(token);
    res.status(status).json(response);
  })
);

export default router;
