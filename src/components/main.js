import React, { Component } from 'react';

import Layout from '../layouts/layout';

import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect
} from 'react-router-dom';

import {
  Page1,
  Page2,
  ProfilePage
} from '../pages';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/images" component={Page1} />
            <Route exact path="/publicpage" component={Page2} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/">
              <Redirect to="/images" />
            </Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}
