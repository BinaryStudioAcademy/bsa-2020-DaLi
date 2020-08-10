import { SET_VISUALIZATION, UPDATE_VISUALIZATION_CONFIG } from './actionTypes';

export const setVisualization = (visualization) => {
  return {
    type: SET_VISUALIZATION,
    payload: { visualization },
  };
};

export const updateVisualizationConfig = (updateConfig) => {
  return {
    type: UPDATE_VISUALIZATION_CONFIG,
    payload: { updateConfig },
  };
};
