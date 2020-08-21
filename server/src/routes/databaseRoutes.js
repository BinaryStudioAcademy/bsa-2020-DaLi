import { Router } from 'express';
import * as DatabaseService from '../services/databaseService';
import { permissionsMiddleware } from '../middlewares/permissions';

const router = Router();

router.get(
  '/',
  async (req, res, next) => {
    const result = await DatabaseService.getDatabases();
    res.data = result;
    next();
  },
  permissionsMiddleware
);

router.get('/:id', async (req, res, next) => {
  const result = await DatabaseService.getDatabase({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('databases not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const result = await DatabaseService.createDatabase(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('database creation failed');
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  const result = await DatabaseService.updateDatabase(
    {
      id: req.params.id,
    },
    req.body
  );
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('database not found');
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const result = await DatabaseService.deleteDatabase({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('database not found');
    next(err);
  }
});

export default router;
