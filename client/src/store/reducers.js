import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import accountSettingsReducer from '../containers/AccountSettingsContainer/reducer';
import analyticsReducer from '../containers/AnalyticsTabsContainer/reducer';
import currentDashboardReducer from '../containers/DashboardContainer/reducer';


export default combineReducers({
  currentUser: loginReducer,
  analytics: analyticsReducer,
  currentVisualization: viewVisualizationReducer,
  accountSettingsReducer,
  currentDashboard: currentDashboardReducer,
});
