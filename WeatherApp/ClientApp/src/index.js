import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router basename={baseUrl} history={history}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  rootElement);

registerServiceWorker();
