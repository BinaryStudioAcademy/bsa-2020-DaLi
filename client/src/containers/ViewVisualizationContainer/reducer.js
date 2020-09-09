import {
  SET_VISUALIZATION_IN_PROGRESS,
  SET_VISUALIZATION_SUCCESS,
  UPDATE_VISUALIZATION_CONFIG,
  UPDATE_VISUALIZATION_NAME,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS,
  FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_START,
  FETCH_DATA_AND_SCHEMA_IN_PROGRESS,
  FETCH_DATA_AND_SCHEMA_SUCCESS,
  UPDATE_VISUALIZATION_ERROR,
  UPDATE_VISUALIZATION_SUCCESS,
  RESET_NOTIFICATION,
} from './actionTypes';

const initialState = {
  loading: false,
  created: false,
  status: '',
  message: '',
};

const viewVisualizationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VISUALIZATION_SUCCESS: {
      const { visualization } = payload;
      return {
        ...state,
        ...visualization,
        loading: false,
        created: true,
      };
    }

    case FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_SUCCESS: {
      const { visualization } = payload;
      visualization.config = JSON.parse(visualization.config);
      visualization.datasetSettings = visualization.datasetSettings.map((s) => JSON.parse(s));
      return {
        ...state,
        ...visualization,
        loading: false,
        created: true,
        // status: '',
        // message: '',
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

    case FETCH_VISUALIZATION_WITH_DATA_AND_SCHEMA_START: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_DATA_AND_SCHEMA_SUCCESS: {
      const { visualization } = payload;
      return {
        ...state,
        ...visualization,
      };
    }

    case FETCH_DATA_AND_SCHEMA_IN_PROGRESS:
    case SET_VISUALIZATION_IN_PROGRESS: {
      return {
        ...state,
        created: false,
        loading: true,
      };
    }
    case UPDATE_VISUALIZATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: 'Visualization has been successfully updated',
        status: 'success',
      };
    }
    case UPDATE_VISUALIZATION_ERROR: {
      return {
        ...state,
        loading: false,
        status: 'error',
        message: payload.message,
      };
    }
    case RESET_NOTIFICATION: {
      return {
        ...state,
        message: '',
        status: '',
      };
    }
    default:
      return state;
  }
};

export default viewVisualizationReducer;
