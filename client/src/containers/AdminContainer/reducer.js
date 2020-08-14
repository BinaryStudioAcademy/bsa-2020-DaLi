import { CHANGE_VIEW } from './actionTypes';

const initialValue = {
  viewName: 'people',
};

const adminReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case CHANGE_VIEW: {
      const { viewName } = payload;
      return { ...state, viewName };
    }
    default:
      return state;
  }
};

export default adminReducer;
