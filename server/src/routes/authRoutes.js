import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as AuthService from '../services/authService';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';
import registrationMiddleware from '../middlewares/registrationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';

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

// router.post(
//   '/login',
//   asyncHandler(async (req, res) => {
//     const { status, response } = await AuthService.login(req.body);
//     res.status(status).json(response);
//   })
// );

// router.post(
//   '/register',
//   asyncHandler(async (req, res) => {
//     const { status, response } = await AuthService.register(req.body);
//     res.status(status).json(response);
//   })
// );

// router.get(
//   '/user',
//   asyncHandler(async (req, res) => {
//     const token = req.headers.authorization;
//     const { status, response } = await AuthService.getUserByToken(token);
//     res.status(status).json(response);
//   })
// );

export default router;
