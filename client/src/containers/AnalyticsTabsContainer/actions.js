import { GET_ANALYTICS, DELETE_VISUALIZATION, ADD_DASHBOARD, DELETE_DASHBOARD } from './actionsTypes';

export const getAnalytics = () => {
  return {
    type: GET_ANALYTICS,
  };
};

export const deleteVisualization = (id) => {
  return {
    type: DELETE_VISUALIZATION,
    id,
  };
};

export const addDashboard = (newDashboard) => {
  return {
    type: ADD_DASHBOARD,
    newDashboard,
  };
};

export const deleteDashboard = (id) => {
  return {
    type: DELETE_DASHBOARD,
    id,
  };
};
