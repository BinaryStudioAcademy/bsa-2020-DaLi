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

router.patch(
  '/:id/tables/update',
  async (req, res, next) => {
    const result = await DatabaseService.updateDatabaseTables(req.params.id);
    res.json(result);
    next();
  },
  permissionsMiddleware
);

router.get(
  '/:id/tables',
  async (req, res, next) => {
    const result = await DatabaseService.getDatabaseTables(req.params.id);
    res.data = result;
    next();
  },
  permissionsMiddleware
);

router.get(
  '/:id',
  async (req, res, next) => {
    const result = await DatabaseService.getDatabase({
      id: req.params.id,
    });
    if (result) {
      res.data = result;
      next();
    } else {
      const err = new Error('database not found');
      next(err);
    }
  },
  permissionsMiddleware
);

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
