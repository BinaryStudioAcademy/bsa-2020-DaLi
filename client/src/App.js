import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { LoginPage, SelectVisualizationPage } from './pages';
import { login } from './containers/LoginPageContainer/actions';
import { getToken } from './helpers/jwtToken';

function App({ login }) {
  const token = getToken();
  useEffect(() => {
    if (token) {
      login();
    }
  }, [login, token]);
  return (
    <Router>
      <Route exact path="/" component={Header} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/select-visualization" component={SelectVisualizationPage} />
    </Router>
  );
}

App.propTypes = {
  login: PropTypes.func,
};

const mapDispatchToProps = { login };

export default connect(null, mapDispatchToProps)(App);
