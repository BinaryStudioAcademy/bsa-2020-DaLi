import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as PermissionCollectionsService from '../services/permissionCollectionsService';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const result = await PermissionCollectionsService.getPermissions();
    res.status(200).json(result);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionCollectionsService.getCollectionPermissions(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      const err = createError(404, `Collection with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.patch(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await PermissionCollectionsService.updateCollectionPermissions(req.body);
    if (result) {
      res.status(204).json(result);
    } else {
      const err = createError(500, 'Operation unsuccessful');
      next(err);
    }
  })
);

export default router;
