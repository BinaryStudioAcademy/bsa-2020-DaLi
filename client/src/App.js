import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { login } from './containers/LoginPageContainer/actions';
import { getToken } from './helpers/jwtToken';
import routes from './routes/routes';
import { Header } from './components';

function App({ isAuthorized, isLoading, login }) {
  const token = getToken();
  useEffect(() => {
    if (token) {
      login();
    }
  }, [login, token]);

  return isLoading ? (
    'Loading'
  ) : (
    <Router>
      {isAuthorized ? <Header /> : null}
      {routes}
    </Router>
  );
}

App.propTypes = {
  login: PropTypes.func,
  isAuthorized: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapDispatchToProps = { login };

const mapStateToProps = ({ currentUser }) => ({
  isAuthorized: currentUser.isAuthorized,
  isLoading: currentUser.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
