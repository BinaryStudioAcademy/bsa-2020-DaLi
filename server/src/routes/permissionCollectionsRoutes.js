import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as PermissionService from '../services/permissionService';
import * as PermissionCollectionsService from '../services/permissionCollectionsService';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionCollectionsService.getPermissions();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionCollectionsService.getCollectionPermissions(req.params.id);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Collection with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.patch(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionService.updateCollectionPermissions(req.body);
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
