import React, { Component } from 'react';
import './App.css';

import AWSAppSyncClient from "aws-appsync";
import { ApolloProvider } from 'react-apollo';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './themes/app-theme';

//Amplify
import awsconfig from './aws-exports';
import Amplify, { Auth } from 'aws-amplify';

import { Authenticator } from './components/auth';
import Main from './components/main';

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
  state = {
    showAuth: true
  }

  handleStateChange = (authState) => {
    this.setState({
      showAuth: !['signedIn'].includes(authState)
    });
    console.log(authState);
  }

  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            {this.state.showAuth ? <Authenticator onStateChange={this.handleStateChange} /> :  <Main />}
          </MuiThemeProvider>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
