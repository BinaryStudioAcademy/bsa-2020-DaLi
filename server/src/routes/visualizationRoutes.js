import { Router } from 'express';
import * as VisualizationService from '../services/visualizationService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await VisualizationService.getVisualizations();
  res.json(result);
  next();
});

router.get('/:id', async (req, res, next) => {
  const result = await VisualizationService.getVisualisation({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('Visualization not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const result = await VisualizationService.createVisualization(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('Visualization creation failed');
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const result = await VisualizationService.updateVisualization(
    {
      id: req.params.id,
    },
    req.body
  );
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error(`Visualization with id of ${req.params.id} not found`);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const result = await VisualizationService.deleteVisualization({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error(`Visualization with id of ${req.params.id} not found`);
    next(err);
  }
});

export default router;
