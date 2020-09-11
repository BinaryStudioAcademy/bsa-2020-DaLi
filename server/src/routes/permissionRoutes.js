import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as PermissionService from '../services/permissionService';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionService.getPermissions();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionService.getDBPermissions(req.params.id);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Database with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionService.updateDBPermissions(req.body);
    if (result) {
      res.status(204).json(result);
      next();
    } else {
      const err = createError(404, `Database with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.patch(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionService.updatePermissions(req.body);
    if (result) {
      res.status(204).json(result);
      next();
    } else {
      const err = createError(500, 'Operation unsuccessful');
      next(err);
    }
  })
);

export default router;
