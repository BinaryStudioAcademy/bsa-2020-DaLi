import createError from 'http-errors';
import DashboardRepository from '../repositories/dashboardRepository';
import CollectionDashboardsVisualizationsRepository from '../repositories/collectionDashboardsRepository';
import CollectionRepository from '../repositories/collectionRepository';

export const getCollections = async () => {
  const result = await CollectionRepository.getAllWithDashboardsAndVisualizations();
  return result;
};

export const createCollection = async (data) => {
  const result = await CollectionRepository.create(data);
  return result;
};

export const deleteCollection = async (id) => {
  const item = await CollectionRepository.getById(id);
  if (!item) {
    throw createError(404, `Collection with id of ${id.id} not found`);
  }
  const result = await CollectionRepository.deleteById(id);
  return result;
};

export const getCollection = async (id) => {
  const item = await CollectionRepository.getWithDashboardsAndVisualizations(id.id);
  if (!item) {
    throw createError(404, `Collection with id of ${id.id} not found`);
  }
  return item[0];
};

export const addToCollection = async (data) => {
  console.log(data);
  const result = await CollectionDashboardsVisualizationsRepository.create(data);
  console.log(result);
  if (!result) {
    return null;
  }
  const updatedCollections = await getCollection({ id: data.collections_id });
  return updatedCollections;
};

export const deleteFromCollection = async (id) => {
  console.log(id);
  const item = await CollectionDashboardsVisualizationsRepository.getById(id);
  console.log(item);
  if (!item) {
    throw createError(404, `Dashboard-visualization link with id of ${id.id} not found`);
  }
  // const result = await CollectionDashboardsVisualizationsRepository.deleteById(id);
  // return result;
};

// export const updateDashboard = async (dashboardId, dataToUpdate) => {
//   const currentDashboard = await DashboardRepository.getById({ id: dashboardId });
//   if (!currentDashboard) {
//     throw createError(404, `Dashboard with id of ${dashboardId} not found`);
//   }
//   const { newVisualizationsId, deletedDashboardVisualizationsId, updatedDashboardData } = dataToUpdate;

//   await Promise.all(
//     newVisualizationsId.map((newVisualizationId) => {
//       const newDashboardVisualization = { visualizations_id: newVisualizationId, dashboards_id: dashboardId };
//       return DashboardVisualizationsRepository.create(newDashboardVisualization);
//     })
//   );
//   await Promise.all(
//     deletedDashboardVisualizationsId.map((deletedDashboardVisualizationId) => {
//       return deleteVisualization({ id: deletedDashboardVisualizationId });
//     })
//   );

//   await DashboardRepository.updateById({ id: dashboardId }, updatedDashboardData);

//   const [updatedDashboard] = await DashboardRepository.getWithVisualizations(dashboardId);
//   return updatedDashboard;
// };
