import { ADD_DASHBOARD, GET_DASHBOARD, UPDATE_DASHBOARD } from './actionsTypes';
import { FETCH_VISUALIZATIONS } from '../AnalyticsTabsContainer/actionsTypes';

export const addDashboard = (newDashboard, history) => {
  return {
    type: ADD_DASHBOARD,
    payload: { newDashboard, history },
  };
};

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
