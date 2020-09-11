import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme/theme';

import Routes from './routes/routes';
import store from './store';
import './App.css';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
