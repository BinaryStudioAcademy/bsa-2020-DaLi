import { GET_ANALYTICS, DELETE_VISUALIZATION } from './actionsTypes';

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
