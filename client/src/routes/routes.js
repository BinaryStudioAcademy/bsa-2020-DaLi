import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ProtectedRoute, PublicRoute } from '../containers';
import {
  LoginPage,
  SelectVisualizationPage,
  ViewVisualizationPage,
  AccountSettingsPage,
  DashboardPage,
  AdminPage,
  AnalyticsPage,
} from '../pages';
import { getToken } from '../helpers/jwtToken';
import { fetchUser } from '../containers/LoginPageContainer/actions';

const Routes = ({ fetchUser, isAuthorized }) => {
  const hasToken = !!getToken();

  useEffect(() => {
    if (hasToken && !isAuthorized) {
      fetchUser();
    }
  });

  return (
    <Switch>
      <PublicRoute exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={AnalyticsPage} />
      <ProtectedRoute path="/visualizations/:id" component={ViewVisualizationPage} />
      <ProtectedRoute exact path="/select-visualization" component={SelectVisualizationPage} />
      <ProtectedRoute exact path="/select-visualization/:id" component={ViewVisualizationPage} />
      <ProtectedRoute exact path="/account-settings" component={AccountSettingsPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <ProtectedRoute exact path="/dashboards/:id" component={DashboardPage} />
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
  };
}

Routes.propTypes = {
  isAuthorized: PropTypes.bool,
  fetchUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
