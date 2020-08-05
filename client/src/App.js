import React from 'react';
import './App.css';
import history from "./history";
import {Router, Route, Switch} from 'react-router-dom'
import SelectVisualization from "./components/SelectVisualization/SelectVisualization";
import logo from './logo.svg';
import {Typography} from '@material-ui/core'

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Switch>
                    <Route path='/selectVisualization' component={SelectVisualization}/>
                </Switch>
            </Router>

            {/*<Typography variant='h6' className="App-header">*/}
            {/*  <img src={logo} className="App-logo" alt="logo" />*/}
            {/*  <p>*/}
            {/*    Edit <code>src/App.js</code> and save to reload.*/}
            {/*  </p>*/}
            {/*  <a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    Learn React*/}
            {/*  </a>*/}
            {/*</Typography>*/}
        </div>
    );
}

export default App;