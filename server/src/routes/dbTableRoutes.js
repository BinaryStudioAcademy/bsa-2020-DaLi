import { Router } from 'express';
import * as DBTablesService from '../services/dbTableService';

const router = Router();

router.get('/data/:id', async (req, res, next) => {
  const result = await DBTablesService.getTableData({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('fetching table data failed');
    next(err);
  }
});

export default router;
