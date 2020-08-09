import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
});
