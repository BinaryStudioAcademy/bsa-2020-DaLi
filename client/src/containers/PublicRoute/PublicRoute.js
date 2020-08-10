import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// sample use case
// <ProtectedRoute exact path="/path" component={Component} />

const PublicRoute = ({ isAuthorized, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthorized) {
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

PublicRoute.propTypes = {
  isAuthorized: PropTypes.bool,
  location: PropTypes.any,
  component: PropTypes.elementType,
};

const mapStateToProps = ({ currentUser }) => ({
  isAuthorized: currentUser.isAuthorized,
});

export default connect(mapStateToProps)(PublicRoute);
