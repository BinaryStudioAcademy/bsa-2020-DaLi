import {
  GET_VISUALISATIONS_SUCCESS,
  GET_VISUALISATIONS_ERROR,
  DELETE_VISUALISATIONS_SUCCESS,
  DELETE_VISUALISATIONS_ERROR,
  IS_LOADING,
  RESET_ERROR,
} from './actionsTypes';

const initialState = {
  visualizations: [],
  isLoading: false,
  error: null,
};

const visualizationsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: payload,
      };
    }
    case GET_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case DELETE_VISUALISATIONS_SUCCESS: {
      return {
        ...state,
        visualizations: payload,
      };
    }
    case DELETE_VISUALISATIONS_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
};

export default visualizationsListReducer;
