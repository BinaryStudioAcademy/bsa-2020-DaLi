import DashboardRepository from '../repositories/dashboardRepository';

export const getDashboards = async () => {
  const result = await DashboardRepository.getAll();
  return result;
};

export const createDashboard = async (data) => {
  const result = await DashboardRepository.create(data);
  return result;
};

export const deleteDashboard = async (id) => {
  const item = await DashboardRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await DashboardRepository.deleteById(id);
  return result;
};

export const updateDashboard = async (id, dataToUpdate) => {
  const item = await DashboardRepository.getById(id);
  if (!item) {
    return null;
  }
  const result = await DashboardRepository.updateById(id, dataToUpdate);
  return result;
};

export const getDashboard = async (id) => {
  const item = await DashboardRepository.getById(id);
  if (!item) {
    return null;
  }
  return item;
};
