import { Router } from 'express';
import * as PermissionService from '../services/permissionService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await PermissionService.getPermissions();
  res.status(200).json(result);
  next();
});

router.get('/:id', async (req, res, next) => {
  const result = await PermissionService.getDBPermissions(req.params.id);
  if (result) {
    res.status(200).json(result);
    next();
  } else {
    const err = new Error('Database not found');
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const result = await PermissionService.updateDBPermissions(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('Database not found');
    next(err);
  }
});

router.patch('/', async (req, res, next) => {
  const result = await PermissionService.updatePermissions(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('Database not found');
    next(err);
  }
});

export default router;
