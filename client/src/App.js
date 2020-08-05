import React from 'react';
import { Typography } from '@material-ui/core';
import logo from './logo.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <Typography variant="h6" className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </Typography>
    </div>
  );
}

export default App;
