import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages';

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
    </Router>
  );
}

export default App;
