import * as types from './actionTypes';

const loginReducer =(state = {}, action) =>{

  switch(action.type) {
    case types.LOGIN_USER:{
      return { ...state};
    }
    case types.LOGIN_USER_SUCCESS:{
      return { 
        ...state,
        user: action.user,
        isAuthorized: Boolean(action.user?.id),
        isLoading: false
      };
    }
    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false
       };
    default:
      return state;
  }
};

export default loginReducer;