import {
  GET_ANALYTICS,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_ERROR,
  FETCH_VISUALIZATIONS_ERROR,
  FETCH_VISUALIZATIONS,
  FETCH_VISUALIZATIONS_SUCCESS,
} from './actionsTypes';

const initialState = {
  visualizations: [],
  dashboards: [],
  isLoading: false,
  error: false,
};

const analyticsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_VISUALIZATIONS:
    case GET_ANALYTICS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_VISUALIZATIONS_ERROR:
    case GET_ANALYTICS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case FETCH_VISUALIZATIONS_SUCCESS: {
      const { visualizations } = payload;
      return {
        ...state,
        visualizations,
      };
    }
    case GET_ANALYTICS_SUCCESS: {
      const { visualizations, dashboards } = payload;
      return {
        ...state,
        isLoading: false,
        visualizations,
        dashboards,
      };
    }
    default:
      return state;
  }
};

export default analyticsReducer;
