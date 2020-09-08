import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// sample use case
// <ProtectedRoute exact path="/path" component={Component} />

const AdminRoute = ({ isAuthorized, isAdmin, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthorized && isAdmin) {
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

AdminRoute.propTypes = {
  isAuthorized: PropTypes.bool,
  isAdmin: PropTypes.bool,
  location: PropTypes.any,
  component: PropTypes.any,
};

const mapStateToProps = ({ currentUser }) => ({
  isAuthorized: currentUser.isAuthorized,
  isAdmin: currentUser.isAdmin,
});

export default connect(mapStateToProps)(AdminRoute);
