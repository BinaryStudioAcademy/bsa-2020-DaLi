import { GET_DASHBOARD, UPDATE_DASHBOARD } from './actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};

export const updateDashboard = ({
  dashboardId,
  newVisualizationsId,
  deletedDashboardVisualizationsId,
  updatedDashboard,
}) => {
  return {
    type: UPDATE_DASHBOARD,
    dashboardId,
    newVisualizationsId,
    deletedDashboardVisualizationsId,
    updatedDashboard,
  };
};
