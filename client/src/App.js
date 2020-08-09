import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { LoginPage, SelectVisualizationPage } from './pages';
import LineChartSettings from './components';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/select-visualization" component={SelectVisualizationPage} />
      <Route exact path="/lc" component={LineChartSettings} />
    </Router>
  );
}

export default App;
