import React from 'react';
import { Switch } from 'react-router-dom';
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
import PeoplePageContainer from '../containers/PeoplePageContainer/PeoplePageContainer';
import DatabasePageContainer from '../containers/DatabasePageContainer/DatabasePageContainer';

const routes = (
  <Switch>
    <PublicRoute exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={AnalyticsPage} />
    <ProtectedRoute path="/visualizations/:id" component={ViewVisualizationPage} />
    <ProtectedRoute exact path="/select-visualization" component={SelectVisualizationPage} />
    <ProtectedRoute exact path="/select-visualization/:id" component={ViewVisualizationPage} />
    <ProtectedRoute exact path="/account-settings" component={AccountSettingsPage} />
    <ProtectedRoute exact path="/admin" component={AdminPage} />
    <ProtectedRoute path="/admin/people" component={PeoplePageContainer} />
    <ProtectedRoute path="/admin/databases" component={DatabasePageContainer} />
    <ProtectedRoute path="/connection-database" component={() => <div>Connection Data Base</div>} />
    <ProtectedRoute exact path="/dashboards/:id" component={DashboardPage} />
  </Switch>
);

export default routes;
