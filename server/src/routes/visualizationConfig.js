import { Router } from 'express';
import * as visualizationConfigService from '../services/visualizationConfigService';

const router = Router();

router.get('/:id', (req, res, next) =>
  visualizationConfigService
    .getConfig(req.params.id)
    .then((config) => res.send(config))
    .catch(next)
);

router.post('/', (req, res, next) =>
  visualizationConfigService
    .createConfig(req.body)
    .then((config) => res.send(config))
    .catch(next)
);

router.put('/:id', (req, res, next) =>
  visualizationConfigService
    .updateConfig(req.params.id, req.body)
    .then((config) => res.send(config))
    .catch(next)
);

router.delete('/:id', (req, res, next) =>
  visualizationConfigService
    .deleteConfig(req.params.id)
    .then(() => res.send('Config deleted successfully'))
    .catch(next)
);

export default router;
