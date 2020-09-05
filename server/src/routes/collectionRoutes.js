import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as CollectionService from '../services/collectionService';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await CollectionService.getCollections();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await CollectionService.getCollection({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Collection with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await CollectionService.createCollection(req.body);
    if (result) {
      res.status(201).json(result);
      next();
    } else {
      const err = createError(400, 'Collection creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await CollectionService.updateCollections(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'Collection update failed');
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await CollectionService.deleteCollection(req.params.id);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Collection with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

export default router;
