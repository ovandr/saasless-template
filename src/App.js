import React, { Component } from 'react';
import './App.css';

import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Amplify
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Page1,
  Page2
} from './pages';
import Layout from './layouts/layout';

Amplify.configure(aws_exports);

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue
  },
  typography: {
    fontSize: 14,
    useNextVariants: true,
  },
  spacing: {
    unit: 6
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            <Layout>
              <Switch>
                <Route exact path="/" component={Page1} />
                <Route exact path="/page2" component={Page2} />
              </Switch>
            </Layout>
          </MuiThemeProvider>
        </Router>
      </div >
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default AppWithAuth;
