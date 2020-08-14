import { CHANGE_VIEW } from './actionTypes';

export const changeView = (viewValue) => {
  return {
    type: CHANGE_VIEW,
    payload: { viewValue },
  };
};
