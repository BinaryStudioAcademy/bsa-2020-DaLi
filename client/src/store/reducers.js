import { combineReducers } from 'redux';
import loginReducer from '../containers/LoginPageContainer/reducer';
import viewVisualizationReducer from '../containers/ViewVisualizationContainer/reducer';
import visualizationsListReducer from '../containers/VisualizationsListContainer/reducer';
import usersListReducer from '../containers/PeoplePageContainer/reducer';
import adminReducer from '../containers/AdminContainer/reducer'

export default combineReducers({
  currentUser: loginReducer,
  visualizations: visualizationsListReducer,
  currentVisualization: viewVisualizationReducer,
  admin: combineReducers({ people: usersListReducer }),
  adminPage: adminReducer
});
