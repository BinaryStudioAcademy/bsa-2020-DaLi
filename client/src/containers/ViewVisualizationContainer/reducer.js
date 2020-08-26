import {
  SET_VISUALIZATION,
  UPDATE_VISUALIZATION_CONFIG,
  UPDATE_VISUALIZATION_NAME,
  FETCH_VISUALIZATION_SUCCESS,
  CREATE_VISUALIZATION_ERROR,
} from './actionTypes';

const viewVisualizationReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_VISUALIZATION: {
      const { visualization } = payload;
      return {
        ...visualization,
      };
    }

    case FETCH_VISUALIZATION_SUCCESS: {
      const { visualization } = payload;
      visualization.config = JSON.parse(visualization.config);
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

    case UPDATE_VISUALIZATION_NAME: {
      const { name, description } = payload;
      return {
        ...state,
        name,
        description,
      };
    }

    case CREATE_VISUALIZATION_ERROR: {
      const { error } = payload;
      return {
        ...state,
        error,
      };
    }

    default:
      return state;
  }
};

export default viewVisualizationReducer;
