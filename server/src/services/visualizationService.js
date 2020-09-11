import createError from 'http-errors';
import VisualizationRepository from '../repositories/visualizationRepository';
import CollectionRepository from '../repositories/collectionRepository';

export const getVisualizations = async () => {
  const result = await VisualizationRepository.getAll();
  return result;
};

export const createVisualization = async (data) => {
  const allCollections = await CollectionRepository.getAll();
  const ourAnalyticsCollectionId = allCollections.filter((collections) => collections.name === 'Our analytics')[0].id;
  const result = await VisualizationRepository.create({ ...data, collections_id: ourAnalyticsCollectionId });
  return result;
};

export const deleteVisualization = async (id) => {
  const item = await VisualizationRepository.getById(id);
  if (!item) {
    throw createError(404, `Visualization with id of ${id.id} not found`);
  }
  const result = await VisualizationRepository.deleteById(id);
  return result;
};

export const updateVisualization = async (visualizationId, dataToUpdate) => {
  const item = await VisualizationRepository.getById({ id: visualizationId });
  if (!item) {
    throw createError(404, `Visualization with id of ${visualizationId} not found`);
  }

  const result = await VisualizationRepository.updateById({ id: visualizationId }, dataToUpdate);
  return result;
};

export const getVisualization = async (id) => {
  const item = await VisualizationRepository.getById(id);
  if (!item) {
    throw createError(404, `Visualization with id of ${id.id} not found`);
  }
  return item;
};
