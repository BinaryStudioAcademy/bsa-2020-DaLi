import { CHANGE_VIEW } from './actionTypes';

const initialValue = {
  viewValue: 0,
};

const adminReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case CHANGE_VIEW: {
      const { viewValue } = payload;
      return { ...state, viewValue };
    }
    default:
      return state;
  }
};

export default adminReducer;
