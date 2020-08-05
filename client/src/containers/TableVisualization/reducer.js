import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  UPDATE_SORTING_CONFIG,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  error: false,
  data: null,
  config: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA: {
      return { ...state, isLoading: true };
    }
    case FETCH_DATA_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case FETCH_DATA_SUCCESS: {
      const { data, config } = action.payload;
      return {
        ...state,
        isLoading: false,
        data,
        config,
      };
    }

    case UPDATE_SORTING_CONFIG: {
      const { order, orderBy } = action.payload;
      return {
        ...state,
        config: {
          ...state.config,
          sort: { order, orderBy },
        },
      };
    }

    default:
      return state;
  }
}
