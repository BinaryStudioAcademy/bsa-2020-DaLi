import createError from 'http-errors';
import VisualizationRepository from '../repositories/visualizationRepository';
import DashboardRepository from '../repositories/dashboardRepository';
import { ACCESS_GRANTED, PRIVATE_COLLECTIONS } from '../config/types';
import CollectionRepository from '../repositories/collectionRepository';

export const userAccessForVisualizationMiddleware = async (req, res, next) => {
  const accessType = await VisualizationRepository.getVisualizationAccess(req.params.id, req.user.id);

  if (accessType === PRIVATE_COLLECTIONS) {
    return next();
  }
  if (accessType.includes(ACCESS_GRANTED)) {
    return next();
  }

  const err = createError(403, "You can't edit/delete visualizations with access type 'View'");
  return next(err);
};

export const userAccessForDashboardMiddleware = async (req, res, next) => {
  const accessType = await DashboardRepository.getDashboardAccess(req.params.id, req.user.id);

  if (accessType === PRIVATE_COLLECTIONS) {
    return next();
  }
  if (accessType.includes(ACCESS_GRANTED)) {
    return next();
  }

  const err = createError(403, "You can't edit/delete dashboards with access type 'View'");
  return next(err);
};

export const userAccessForCollectionMiddleware = async (req, res, next) => {
  const accessType = await CollectionRepository.getCollectionAccess(req.params.id, req.user.id);
  if (accessType.includes(ACCESS_GRANTED)) {
    return next();
  }

  const err = createError(403, "You can't edit/delete collections with access type 'View'");
  return next(err);
};
