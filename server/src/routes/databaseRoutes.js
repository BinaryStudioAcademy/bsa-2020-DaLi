import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as DatabaseService from '../services/databaseService';
import { permissionsMiddleware } from '../middlewares/permissionsMiddleware';

const router = Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.getDatabases();
    res.data = result;
    next();
  }),
  permissionsMiddleware
);

router.patch(
  '/:id/tables/update',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.updateDatabaseTables(req.params.id);
    res.json(result);
    next();
  }),
  permissionsMiddleware
);

router.get(
  '/:id/tables',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.getDatabaseTables(req.params.id);
    res.data = result;
    next();
  }),
  permissionsMiddleware
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.getDatabase({
      id: req.params.id,
    });
    if (result) {
      res.data = result;
      next();
    } else {
      const err = createError(404, `Database with id of ${req.params.id} not found`);
      next(err);
    }
  }),
  permissionsMiddleware
);

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.createDatabase(req.body);
    if (result) {
      res.status(201).json(result);
      next();
    } else {
      const err = createError(500, 'Database creation failed');
      next(err);
    }
  })
);

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.updateDatabase(
      {
        id: req.params.id,
      },
      req.body
    );
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(500, 'Database update failed');
      next(err);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const result = await DatabaseService.deleteDatabase({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(404, `Database with id of ${req.params.id} not found`);
      next(err);
    }
  })
);

export default router;
