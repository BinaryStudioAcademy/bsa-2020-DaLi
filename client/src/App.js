import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography } from '@material-ui/core'

import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Typography variant='h6' className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Typography>
    </div>
  );
}

export default App;
