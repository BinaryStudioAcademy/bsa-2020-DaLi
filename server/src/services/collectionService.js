import createError from 'http-errors';
import CollectionRepository from '../repositories/collectionRepository';
import VisualizationRepository from '../repositories/visualizationRepository';
import DashboardRepository from '../repositories/dashboardRepository';

export const getCollections = async () => {
  const result = await CollectionRepository.getAllWithDashboardsAndVisualizations();
  return result;
};

export const createCollection = async (data) => {
  const result = await CollectionRepository.create(data);
  return result;
};

export const deleteCollection = async (id) => {
  const item = await CollectionRepository.getById({ id });
  if (!item) {
    throw createError(404, `Collection with id of ${id} not found`);
  }

  await CollectionRepository.deleteById({ id });
  const visualizations = await VisualizationRepository.getAllVisualizationsWithoutCollections();
  const dashboards = await DashboardRepository.getAllDashboardsWithoutCollections();
  const initialCollectionId = await CollectionRepository.getInitialCollectionId();

  visualizations.forEach(async ({ id, ...rest }) => {
    await VisualizationRepository.updateById(
      { id },
      {
        ...rest,
        collections_id: initialCollectionId,
      }
    );
  });

  dashboards.forEach(async ({ id, ...rest }) => {
    await DashboardRepository.updateById(
      { id },
      {
        ...rest,
        collections_id: initialCollectionId,
      }
    );
  });
  return { status: 'Collection deleted success' };
};

export const updateCollections = async (collectionId, dataToUpdate) => {
  const item = await CollectionRepository.getById({ id: collectionId });
  if (!item) {
    throw createError(404, `Visualization with id of ${collectionId} not found`);
  }

  const result = await CollectionRepository.updateById({ id: collectionId }, dataToUpdate);
  return result;
};

export const getCollection = async (id) => {
  const item = await CollectionRepository.getWithDashboardsAndVisualizations(id.id);
  if (!item) {
    throw createError(404, `Collection with id of ${id.id} not found`);
  }
  return item[0];
};
