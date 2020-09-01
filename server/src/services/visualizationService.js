import createError from 'http-errors';
import VisualisationRepository from '../repositories/visualizationRepository';

export const getVisualizations = async () => {
  const result = await VisualisationRepository.getAll();
  return result;
};

export const createVisualization = async (data) => {
  const result = await VisualisationRepository.create(data);
  return result;
};

export const deleteVisualization = async (id) => {
  const item = await VisualisationRepository.getById(id);
  if (!item) {
    throw createError(404, `Visualization with id of ${id.id} not found`);
  }
  const result = await VisualisationRepository.deleteById(id);
  return result;
};

export const updateVisualization = async (id, dataToUpdate) => {
  const item = await VisualisationRepository.getById(id);
  if (!item) {
    throw createError(404, `Visualization with id of ${id.id} not found`);
  }
  const result = await VisualisationRepository.updateById(id, dataToUpdate);
  return result;
};

export const getVisualisation = async (id) => {
  const item = await VisualisationRepository.getById(id);
  if (!item) {
    throw createError(404, `Visualization with id of ${id.id} not found`);
  }
  return item;
};
