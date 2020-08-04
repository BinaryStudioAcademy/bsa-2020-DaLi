import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "./actionTypes";

const initialState = {
  isLoading: false,
  error: false,
  data: null,
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
      const { data } = action.payload;
      return {
        ...state,
        isLoading: false,
        data,
      };
    }

    default:
      return state;
  }
}
