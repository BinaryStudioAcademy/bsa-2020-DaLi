import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
  currentVisualization: viewVisualizationReducer,
});
