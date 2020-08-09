import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { LoginPage, SelectVisualizationPage } from './pages';
import DaLiTheme from './components/shared/DaLiTheme';
import ExampleComponent from './components/ExampleComponent/ExampleComponent';

function App() {
  return (
    <ThemeProvider theme={DaLiTheme}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/select-visualization" component={SelectVisualizationPage} />
        <Route exact path="/example" component={ExampleComponent} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
