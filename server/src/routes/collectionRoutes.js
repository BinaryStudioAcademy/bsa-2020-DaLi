import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as DashboardService from '../services/dashboardService';
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

// ------------------

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DashboardService.updateDashboard(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'Dashboard update failed');
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = null;
    console.log('////////////////////////////////////////////////////////////////////////////////////////////////');
    console.log(req.query.dash);

    await CollectionService.deleteFromCollection({
      id: req.query.dash,
    });
    // if (req.query.dashboardId) {
    //   result = await CollectionService.deleteFromCollection({
    //     id: req.query.dashboardId,
    //   });
    // } else if (req.query.visualizationId) {
    //   result = await CollectionService.deleteFromCollection({
    //     id: req.query.visualizationId,
    //   });
    // } else {
    //   result = await CollectionService.deleteCollection({
    //     id: req.params.id,
    //   });
    // }
    // if (result) {
    //   res.status(200).json();
    //   next();
    // } else if (req.query.dashboardVisualizationsId) {
    //   const err = createError(404, 'Dashboard or Visualization not found');
    //   next(err);
    // } else {
    //   const err = createError(404, `Collection with id of ${req.params.id} not found`);
    //   next(err);
    // }
  })
);

router.post(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const data = {
      dashboards_id: req.body.dashboardId,
      visualizations_id: req.body.visualizationId,
      collections_id: req.params.id,
    };
    const result = await CollectionService.addToCollection(data);
    console.log('/////////////////////////////');
    console.log(result);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'Dashboard or Visualization has not been added');
      next(err);
    }
  })
);

export default router;
