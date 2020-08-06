import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { TableVisualizationPage } from './pages';

function App() {
  return (
    <Router>
      <Route exact path="/table-visualization" component={TableVisualizationPage} />
    </Router>
  );
}

export default App;
