import createError from 'http-errors';
import * as CollectionService from '../services/collectionService';
import { DEFAULT_COLLECTIONS, PRIVATE_COLLECTIONS } from '../config/types';

export const defaultCollectionsMiddleware = async (req, res, next) => {
  const result = await CollectionService.getCollection({
    id: req.params.id,
  });

  if (result.name === DEFAULT_COLLECTIONS || result.name === PRIVATE_COLLECTIONS) {
    const err = createError(403, "You can't edit/delete default collections");
    return next(err);
  }

  return next();
};
