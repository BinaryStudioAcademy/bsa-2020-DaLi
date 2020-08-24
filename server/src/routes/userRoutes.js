import { Router } from 'express';
import * as UserService from '../services/userService';
import { generatePassword } from '../helpers/generatePassword';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await UserService.getUsers();
  res.json(result);
  next();
});

router.get('/:id', async (req, res, next) => {
  const result = await UserService.getUser({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('User not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  if (!req.body.password) {
    req.body.password = generatePassword();
  }
  const result = await UserService.createUser(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('User creation failed');
    next(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    if (req.body.password === null) {
      req.body.password = generatePassword();
    }

    const result = await UserService.updateUser(
      {
        id: req.params.id,
      },
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(err.code);
    res.json({
      error: true,
      message: err.message,
    });
  }
});

router.delete('/:id', async (req, res, next) => {
  const result = await UserService.deleteUser({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error(`User with id of ${req.params.id} not found`);
    next(err);
  }
});

export default router;
