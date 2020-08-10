import React from 'react';
import { Switch } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from '../containers';
import { LoginPage, SelectVisualizationPage } from '../pages';

const routes = (
  <Switch>
    <PublicRoute exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={SelectVisualizationPage} />
    <ProtectedRoute exact path="/select-visualization" component={SelectVisualizationPage} />
  </Switch>
);

export default routes;
