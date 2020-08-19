import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import usersListReducer from '../containers/PeoplePageContainer/reducer';
import accountSettingsReducer from '../containers/AccountSettingsContainer/reducer';
import analyticsReducer from '../containers/AnalyticsTabsContainer/reducer';
import currentDashboardReducer from '../containers/DashboardContainer/reducer';

export default combineReducers({
  currentUser: loginReducer,
  analytics: analyticsReducer,
  currentVisualization: viewVisualizationReducer,
  admin: combineReducers({ people: usersListReducer }),
  accountSettingsReducer,
  currentDashboard: currentDashboardReducer,
});
