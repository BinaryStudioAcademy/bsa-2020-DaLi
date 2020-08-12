import { Router } from 'express';
import * as DashboardService from '../services/dashboardService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await DashboardService.getDashboards();
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
  const result = await DashboardService.deleteDashboard({
    id: req.params.id,
  });
  if (result) {
    res.status(200).json({ error: false, result });
    next();
  } else {
    const err = new Error(`Dashboard with id of ${req.params.id} not found`);
    next(err);
  }
});

export default router;
