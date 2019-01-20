import React, { Component } from 'react';
import './App.css';

import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from 'react-apollo';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/app-theme';

//Amplify
import awsconfig from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';

import { Auth as sAuth } from './frontends/auth-core';
import { Authenticator, PrivateRoute } from './frontends/auth-react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  Page1,
  Page2,
  SignUpPage,
  SignInPage,
  ProfilePage
} from './pages';
import Layout from './layouts/layout';

const auth = new sAuth({});
Amplify.configure(awsconfig);

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <Router>
            <Authenticator auth={auth}>
              <MuiThemeProvider theme={theme}>
                <Switch>
                  <Route exact path="/signup" component={SignUpPage} />
                  <Route exact path="/signin" component={SignInPage} />

                  <Layout>
                    <Switch>
                      <PrivateRoute exact path="/images" component={Page1} />
                      <Route exact path="/publicpage" component={Page2} />
                      <PrivateRoute exact path="/profile" component={ProfilePage} />
                      <Route exact path="/">
                        <Redirect to="/images" />
                      </Route>
                    </Switch>
                  </Layout>
                </Switch>
              </MuiThemeProvider>
            </Authenticator>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
