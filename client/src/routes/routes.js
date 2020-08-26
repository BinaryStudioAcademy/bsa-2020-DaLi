import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProtectedRoute, PublicRoute, DataSourcesDatasetsContainer, DataSourcesTablesContainer } from '../containers';
import {
  LoginPage,
  SelectVisualizationPage,
  ViewVisualizationPage,
  AccountSettingsPage,
  DashboardPage,
  AdminPage,
  AnalyticsPage,
  ConnectionDatabasePage,
} from '../pages';
import { getToken } from '../helpers/jwtToken';
import { fetchUser } from '../containers/LoginPageContainer/actions';
import MapVisualization from '../containers/MapVisualization/MapVisualization';
import MapVisualization2 from '../containers/MapVisualization2/MapVisualization2';
// import GoogleApiWrapper from '../containers/MapVisualizationGoogle/MapVisualizationGoogle';
import GoogleApiWrapper from '../containers/MapVisualizationGoogle2/MapVisualizationGoogle2';
import MapVisualizationGoogleMap from '../containers/MapVisualizationGoogleMap/MapVisualizationGoogleMap';

const Routes = ({ fetchUser, isAuthorized, isLoading }) => {
  const hasToken = !!getToken();

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  }, [fetchUser, hasToken, isAuthorized, isLoading]);

  return isLoading || (hasToken && !isAuthorized) ? (
    <CircularProgress size={40} left={-20} top={-40} style={{ marginLeft: '50%', marginTop: '50%' }} />
  ) : (
    <Switch>
      <PublicRoute exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={AnalyticsPage} />
      <ProtectedRoute path="/visualizations/:id" component={ViewVisualizationPage} />
      <ProtectedRoute exact path="/select-visualization" component={SelectVisualizationPage} />
      <ProtectedRoute exact path="/select-visualization/:id" component={ViewVisualizationPage} />
      <ProtectedRoute exact path="/account-settings" component={AccountSettingsPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <ProtectedRoute path="/connection-database" component={ConnectionDatabasePage} />
      <ProtectedRoute exact path="/dashboards/:id" component={DashboardPage} />
      <ProtectedRoute exact path="/data-sources" component={DataSourcesDatasetsContainer} />
      <ProtectedRoute exact path="/data-sources/:id" component={DataSourcesTablesContainer} />
      <ProtectedRoute exact path="/map" component={MapVisualization} />
      <ProtectedRoute exact path="/map2" component={MapVisualization2} />
      {/* <ProtectedRoute exact path="/google" component={GoogleApiWrapper} /> */}
      <ProtectedRoute exact path="/google2" component={GoogleApiWrapper} />
      <ProtectedRoute exact path="/googlemap" component={MapVisualizationGoogleMap} />
      <Redirect to="/" />
    </Switch>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
}

function mapStateToProps({ currentUser }) {
  return {
    isAuthorized: currentUser.isAuthorized,
    isLoading: currentUser.isLoading,
  };
}

Routes.propTypes = {
  isAuthorized: PropTypes.bool,
  fetchUser: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
