import { GET_ANALYTICS, GET_ANALYTICS_SUCCESS, GET_ANALYTICS_ERROR } from './actionsTypes';

const initialState = {
  visualizations: [],
  dashboards: [],
  isLoading: false,
  error: false,
};

const visualizationsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ANALYTICS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ANALYTICS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: payload,
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

export default visualizationsListReducer;
