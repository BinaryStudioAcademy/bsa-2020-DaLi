import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// mock isAuthenticated value
const isAuthenticated = true;

// sample use case
// <ProtectedRoute exact path="/path" component={Component} />

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  location: PropTypes.string.isRequired,
  component: PropTypes.elementType,
};

export default ProtectedRoute;
