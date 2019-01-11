import React, { Component } from 'react';
import './App.css';

//Amplify
import Amplify, { Auth } from 'aws-amplify';

import { withAuthenticator } from 'aws-amplify-react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Page1,
  Page2
} from './pages';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Page1} />
            <Route exact path="/campaigns" component={Page2} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const AppWithAuth = withAuthenticator(App, true);

export default AppWithAuth;
