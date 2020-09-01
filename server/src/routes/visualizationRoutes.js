import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as VisualizationService from '../services/visualizationService';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await VisualizationService.getVisualizations();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await VisualizationService.getVisualization({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Visualization with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await VisualizationService.createVisualization(req.body);
    if (result) {
      res.status(201).json(result);
      next();
    } else {
      const err = createError(500, 'Visualization creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    let result = null;
    if (req.query.collection) {
      result = await VisualizationService.updateVisualization(req.params.id, {
        collections_id: req.query.collection,
      });
    } else {
      result = await VisualizationService.updateVisualization(req.params.id, req.body);
    }

    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Visualization with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await VisualizationService.deleteVisualization({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json();
      next();
    } else {
      const err = createError(404, `Visualization with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

export default router;
