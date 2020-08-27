import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as DashboardService from '../services/dashboardService';

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
      res.status(200).json(result);
      next();
    } else {
      const err = createError(500, 'Dashboard creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DashboardService.updateDashboard(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(500, 'Dashboard update failed');
      next(err);
    }
  })
);

router.delete(
  '/:id',
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
      res.status(200).json(result);
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
      const err = createError(500, 'Visualization has not been added');
      next(err);
    }
  })
);

export default router;
