import { GET_DASHBOARD, UPDATE_DASHBOARD } from './actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};

export const updateDashboard = ({
  dashboardId,
  addedVisualizationsId,
  deletedDashboardVisualizationsId,
  updatedDashboard,
}) => {
  return {
    type: UPDATE_DASHBOARD,
    dashboardId,
    addedVisualizationsId,
    deletedDashboardVisualizationsId,
    updatedDashboard,
  };
};
