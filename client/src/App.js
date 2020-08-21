import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import Routes from './routes/routes';
import { Header } from './components';

function App({ isAuthorized, isLoading }) {
  return isLoading ? (
    'Loading'
  ) : (
    <Router>
      {isAuthorized ? <Header /> : null}
      <Routes />
    </Router>
  );
}

App.propTypes = {
  isAuthorized: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = ({ currentUser }) => ({
  isAuthorized: currentUser.isAuthorized,
  isLoading: currentUser.isLoading,
});

export default connect(mapStateToProps)(App);
