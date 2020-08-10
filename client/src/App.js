import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { login } from './containers/LoginPageContainer/actions';
import { getToken } from './helpers/jwtToken';
import routes from './routes/routes';

function App({ login }) {
  const token = getToken();
  useEffect(() => {
    if (token) {
      login();
    }
  }, [login, token]);
  return <Router>{routes}</Router>;
}

App.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(App);
