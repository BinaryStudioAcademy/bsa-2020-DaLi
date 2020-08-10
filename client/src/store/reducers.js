import { combineReducers } from 'redux';
import loginreducer from '../containers/LoginPageContainer/reducer';
import visualizationsListReducer from '../containers/VisualizationsListContainer/reducer';

export default combineReducers({
  loginreducer,
  visualizationsListReducer,
});
