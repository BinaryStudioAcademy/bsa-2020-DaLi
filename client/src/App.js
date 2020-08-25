import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/routes';
import store from './store';
import './App.css';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  </Provider>
);

export default App;
