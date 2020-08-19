import {
  GET_ANALYTICS,
  ADD_VISUALIZATION,
  DELETE_VISUALIZATION,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
} from './actionsTypes';

export const getAnalytics = () => {
  return {
    type: GET_ANALYTICS,
  };
};

export const addVisualization = (newVisualization) => {
  return {
    type: ADD_VISUALIZATION,
    newVisualization,
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
