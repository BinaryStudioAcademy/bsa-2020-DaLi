import { SET_VISUALIZATION, UPDATE_VISUALIZATION_CONFIG } from './actionTypes';

const viewVisualizationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_VISUALIZATION: {
      const { visualization } = payload;
      return {
        ...visualization,
      };
    }

    case UPDATE_VISUALIZATION_CONFIG: {
      const { updateConfig } = payload;
      return {
        ...state,
        config: updateConfig,
      };
    }

    default:
      return state;
  }
};

export default viewVisualizationReducer;
