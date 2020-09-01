import { GET_DASHBOARD, UPDATE_DASHBOARD } from './actionsTypes';
import { FETCH_VISUALIZATIONS } from '../AnalyticsTabsContainer/actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};

export const fetchVisualizations = () => {
  return {
    type: FETCH_VISUALIZATIONS,
  };
};

export const updateDashboard = ({
  dashboardId,
  newVisualizationsId,
  deletedDashboardVisualizationsId,
  updatedDashboardData,
}) => {
  return {
    type: UPDATE_DASHBOARD,
    dashboardId,
    newVisualizationsId,
    deletedDashboardVisualizationsId,
    updatedDashboardData,
  };
};
