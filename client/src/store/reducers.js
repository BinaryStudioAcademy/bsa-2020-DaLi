import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import analyticsReducer from '../containers/AnalyticsTabsContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
  analytics: analyticsReducer,
  currentVisualization: viewVisualizationReducer,
});
