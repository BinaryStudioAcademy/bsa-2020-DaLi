import { Router } from 'express';
import * as DashboardService from '../services/dashboardService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await DashboardService.getDashboards();
  console.log(result);
  res.status(200).json({ error: false, result });
  next();
});

router.get('/:id', async (req, res, next) => {
  const result = await DashboardService.getDashboard({
    id: req.params.id,
  });
  if (result) {
    res.status(200).json({ error: false, result });
    next();
  } else {
    const err = new Error('Dashboard not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const result = await DashboardService.createDashboard(req.body);
  if (result) {
    res.status(200).json({ error: false, result });
    next();
  } else {
    const err = new Error('Dashboard creation failed');
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const result = await DashboardService.updateDashboard(
    {
      id: req.params.id,
    },
    req.body
  );
  if (result) {
    res.status(200).json({ error: false, result });
    next();
  } else {
    const err = new Error(`Dashboard with id of ${req.params.id} not found`);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
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
    res.status(200).json({ error: false, result });
    next();
  } else if (req.query.dashboardVisualizationsId) {
    const err = new Error('Visualization not found');
    next(err);
  } else {
    const err = new Error(`Dashboard with id of ${req.params.id} not found`);
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const data = {
    ...req.body,
    dashboards_id: req.params.id,
  };
  const result = await DashboardService.addVisualization(data);
  if (result) {
    res.status(200).json({ error: false, result });
    next();
  } else {
    const err = new Error('Visualization has not been added');
    next(err);
  }
});

export default router;
