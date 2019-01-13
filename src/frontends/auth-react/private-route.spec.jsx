import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { PrivateRoute, Authenticator } from './index';

describe('PrivateRoute', () => {
  const node = document.createElement('div');

  const authMock = {
    isAuthenticated: jest.fn(),
    setNavigationHistory: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    getLoginPath: jest.fn().mockImplementation(() => '/test-login-path'),
  };

  let history;
  beforeEach(() => {
    history = createHistory();
    Object.keys(authMock).forEach(key => authMock[key].mockClear());
    authMock.isAuthenticated.mockReset();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('throws if not inside the Authenticator', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      ReactDOM.render(
        <PrivateRoute />,
        node,
      );
    }).toThrow();

    spy.mockRestore();
  });

  it('renders the content component if is authenticated', () => {
    const renderer = jest.fn().mockImplementation(() => null);
    authMock.isAuthenticated.mockReturnValue(true);

    expect(history.location.pathname).toBe('/');

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Switch>
            <Route exact path="/test-login-path" />
            <PrivateRoute path="/">{renderer}</PrivateRoute>
          </Switch>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
  });

  it('redirects to login uri if is NOT authenticated', () => {
    const renderer = jest.fn().mockImplementation(() => null);
    authMock.isAuthenticated.mockReturnValue(false);

    expect(history.location.pathname).toBe('/');

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Switch>
            <Route exact path="/test-login-path" />
            <PrivateRoute path="/">{renderer}</PrivateRoute>
          </Switch>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(0);
    expect(history.location).toMatchObject({
      pathname: '/test-login-path',
      search: '?redirect=/',
      hash: '',
    });
  });

  it('saves current uri if redirects for authentication', () => {
    authMock.isAuthenticated.mockReturnValue(false);

    history.push('/some-uri/not-exact');
    expect(history.location.pathname).toBe('/some-uri/not-exact');

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Switch>
            <Route exact path="/test-login-path" />
            <PrivateRoute path="/some-uri" />
          </Switch>
        </Authenticator>
      </Router>,
      node,
    );

    expect(history.location).toMatchObject({
      pathname: '/test-login-path',
      search: '?redirect=/some-uri/not-exact',
      hash: '',
    });
  });

  it('works with the outside back redirect after authentication', () => {
    authMock.isAuthenticated.mockReturnValue(false);

    history.push('/some-uri/not-exact');

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Switch>
            <Route exact path="/test-login-path" />
            <PrivateRoute path="/some-uri" />
          </Switch>
        </Authenticator>
      </Router>,
      node,
    );

    expect(history.location.pathname).toBe('/test-login-path');

    history.replace('/some-uri/not-exact');
    expect(history.location.pathname).toBe('/test-login-path');

    authMock.isAuthenticated.mockReturnValue(true);
    history.replace('/some-uri/not-exact');
    expect(history.location.pathname).toBe('/some-uri/not-exact');
  });
});
