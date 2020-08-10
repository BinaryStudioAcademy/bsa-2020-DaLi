import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components';
import { LoginPage, SelectVisualizationPage, VisualizationsPage, ViewVisualizationPage } from './pages';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Header} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/select-visualization" component={SelectVisualizationPage} />
      <Route exact path="/visualizations" component={VisualizationsPage} />
      <Route exact path="/visualizations/:id" component={ViewVisualizationPage} />
    </Router>
  );
}

export default App;
