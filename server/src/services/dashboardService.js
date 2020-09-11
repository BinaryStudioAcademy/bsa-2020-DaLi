import createError from 'http-errors';
import DashboardRepository from '../repositories/dashboardRepository';
import DashboardVisualizationsRepository from '../repositories/dashboardVisualizationsRepository';
import CollectionRepository from '../repositories/collectionRepository';

export const getDashboards = async () => {
  const result = await DashboardRepository.getAllWithVisualizations();
  return result;
};

export const createDashboard = async (data) => {
  const initialCollectionId = await CollectionRepository.getInitialCollectionId();
  const result = await DashboardRepository.create({ ...data, collections_id: initialCollectionId });
  return result;
};

export const deleteDashboard = async (id) => {
  const item = await DashboardRepository.getById(id);
  if (!item) {
    throw createError(404, `Dashboard with id of ${id.id} not found`);
  }
  const result = await DashboardRepository.deleteById(id);
  return result;
};

export const getDashboard = async (id) => {
  const item = await DashboardRepository.getWithVisualizations(id.id);
  if (!item) {
    throw createError(404, `Dashboard with id of ${id.id} not found`);
  }
  return item[0];
};

export const addVisualization = async (data) => {
  const result1 = await DashboardVisualizationsRepository.create(data);
  if (!result1) {
    return null;
  }
  const result = await getDashboard({ id: data.dashboards_id });
  return result;
};

export const deleteVisualization = async (id) => {
  const item = await DashboardVisualizationsRepository.getById(id);
  if (!item) {
    throw createError(404, `Dashboard-visualization link with id of ${id.id} not found`);
  }
  const result = await DashboardVisualizationsRepository.deleteById(id);
  return result;
};

export const updateDashboard = async (dashboardId, dataToUpdate) => {
  const currentDashboard = await DashboardRepository.getById({ id: dashboardId });
  if (!currentDashboard) {
    throw createError(404, `Dashboard with id of ${dashboardId} not found`);
  }

  if (dataToUpdate.collections_id) {
    await DashboardRepository.updateById({ id: dashboardId }, dataToUpdate);
    return {
      status: 'Dashboard added to collection success',
    };
  }

  const { newVisualizationsId, deletedDashboardVisualizationsId, updatedDashboardData } = dataToUpdate;

  await Promise.all(
    newVisualizationsId.map((newVisualizationId) => {
      const newDashboardVisualization = { visualizations_id: newVisualizationId, dashboards_id: dashboardId };
      return DashboardVisualizationsRepository.create(newDashboardVisualization);
    })
  );
  await Promise.all(
    deletedDashboardVisualizationsId.map((deletedDashboardVisualizationId) => {
      return deleteVisualization({ id: deletedDashboardVisualizationId });
    })
  );

  await DashboardRepository.updateById({ id: dashboardId }, updatedDashboardData);

  const [updatedDashboard] = await DashboardRepository.getWithVisualizations(dashboardId);
  return updatedDashboard;
};
