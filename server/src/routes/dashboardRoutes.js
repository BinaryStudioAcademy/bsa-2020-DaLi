import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as DashboardService from '../services/dashboardService';
import { userAccessForDashboardMiddleware } from '../middlewares/userAccessMiddleware';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await DashboardService.getDashboards();
    res.status(200).json(result);
    next();
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DashboardService.getDashboard({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Dashboard with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await DashboardService.createDashboard(req.body);
    if (result) {
      res.status(201).json(result);
      next();
    } else {
      const err = createError(400, 'Dashboard creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  userAccessForDashboardMiddleware,
  asyncHandler(async (req, res, next) => {
    let result = null;
    console.log(req.params.id, req.body);
    if (req.query.collection) {
      result = await DashboardService.updateDashboard(req.params.id, {
        collections_id: req.query.collection,
      });
    } else {
      result = await DashboardService.updateDashboard(req.params.id, req.body);
    }

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
  userAccessForDashboardMiddleware,
  asyncHandler(async (req, res, next) => {
    let result = null;
    if (req.query.dashboardVisualizationsId) {
      result = await DashboardService.deleteVisualization({
        id: req.query.dashboardVisualizationsId,
      });
    } else {
      result = await DashboardService.deleteDashboard({
        id: req.params.id,
      });
    }
    if (result) {
      res.status(200).json();
      next();
    } else if (req.query.dashboardVisualizationsId) {
      const err = createError(404, 'Visualization not found');
      next(err);
    } else {
      const err = createError(404, `Dashboard with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

router.post(
  '/:id',
  userAccessForDashboardMiddleware,
  asyncHandler(async (req, res, next) => {
    const data = {
      visualizations_id: req.body.visualizationId,
      dashboards_id: req.params.id,
    };
    const result = await DashboardService.addVisualization(data);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'Visualization has not been added');
      next(err);
    }
  })
);

export default router;
