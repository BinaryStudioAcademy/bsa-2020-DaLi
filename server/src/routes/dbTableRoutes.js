import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as DBTablesService from '../services/dbTableService';

const router = Router();

router.post(
  '/:id/data',
  asyncHandler(async (req, res, next) => {
    const result = await DBTablesService.getTableData(
      {
        id: req.params.id,
      },
      req.body
    );
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'fetching table data failed');
      next(err);
    }
  })
);

router.get(
  '/:id/schema',
  asyncHandler(async (req, res, next) => {
    const result = await DBTablesService.getTableSchema({
      id: req.params.id,
    });
    if (result) {
      res.status(200).json(result);
      next();
    } else {
      const err = createError(400, 'fetching table schema failed');
      next(err);
    }
  })
);

export default router;
