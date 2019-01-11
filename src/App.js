import React, { Component } from 'react';
import './App.css';

//Amplify
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Page1,
  Page2
} from './pages';

Amplify.configure(aws_exports);

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
