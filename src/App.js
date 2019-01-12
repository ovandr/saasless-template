import React, { Component } from 'react';
import './App.css';

import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from 'react-apollo';

import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Amplify
import aws_exports from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Page1,
  Page2
} from './pages';
import Layout from './layouts/layout';


import awsconfig from './aws-exports';

Amplify.configure(aws_exports);

const GRAPHQL_API_REGION = awsconfig.aws_appsync_region
const GRAPHQL_API_ENDPOINT_URL = awsconfig.aws_appsync_graphqlEndpoint
const AUTH_TYPE = awsconfig.aws_appsync_authenticationType

// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});

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
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      </div >
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default AppWithAuth;
