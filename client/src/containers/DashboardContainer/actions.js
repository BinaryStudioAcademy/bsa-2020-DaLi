import { GET_DASHBOARD, ADD_VISUALIZATIONS_TO_DASHBOARD } from './actionsTypes';

export const getDashboard = (id) => {
  return {
    type: GET_DASHBOARD,
    id,
  };
};
export const addVisualizationsToDashboard = ({ dashboardId, visualizations, updatedDashboard }) => {
  return {
    type: ADD_VISUALIZATIONS_TO_DASHBOARD,
    dashboardId,
    visualizations,
    updatedDashboard,
  };
};
