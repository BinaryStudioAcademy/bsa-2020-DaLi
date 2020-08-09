import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages';
import { Header } from './components';

function App() {
  return (
    <Router>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={Header} />
    </Router>
  );
}

export default App;
