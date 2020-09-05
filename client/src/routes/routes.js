import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  ProtectedRoute,
  PublicRoute,
  AdminRoute,
  DataSourcesDatasetsContainer,
  DataSourcesTablesContainer,
} from '../containers';
import {
  LoginPage,
  ViewVisualizationPage,
  AccountSettingsPage,
  DashboardPage,
  AdminPage,
  AnalyticsPage,
} from '../pages';
import { getToken } from '../helpers/jwtToken';
import { fetchUser } from '../containers/LoginPageContainer/actions';
import CollectionContainer from '../containers/CollectionContainer/CollectionContainer';

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
      <ProtectedRoute exact path="/select-visualization/:id" component={ViewVisualizationPage} />
      <ProtectedRoute exact path="/account-settings" component={AccountSettingsPage} />
      <AdminRoute path="/admin" component={AdminPage} />
      <ProtectedRoute exact path="/dashboards/:id" component={DashboardPage} />
      <ProtectedRoute exact path="/data-sources" component={DataSourcesDatasetsContainer} />
      <ProtectedRoute exact path="/data-sources/:id" component={DataSourcesTablesContainer} />
      <ProtectedRoute exact path="/collections/:id" component={CollectionContainer} />
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
