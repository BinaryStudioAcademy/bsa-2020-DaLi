import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as UserService from '../services/userService';
import { generatePassword } from '../helpers/generatePassword';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await UserService.getUsers();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await UserService.getUser({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `User with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    if (!req.body.password) {
      req.body.password = generatePassword();
    }
    const result = await UserService.createUser(req.body);
    if (result) {
      res.status(201).json(result);
      next();
    } else {
      const err = createError(500, 'User creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    if (req.body.password === null) {
      req.body.password = generatePassword();
    }

    const result = await UserService.updateUser(
      {
        id: req.params.id,
      },
      req.body
    );
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(500, 'User update failed');
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await UserService.deleteUser({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `User with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

export default router;
