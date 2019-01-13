import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Logout, Authenticator } from './index';

describe('Logout', () => {
  const node = document.createElement('div');

  const authMock = {
    isAuthenticated: jest.fn().mockImplementation(() => false),
    setNavigationHistory: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    logout: jest.fn().mockImplementation(() => (Promise.resolve())),
  };

  let history;
  beforeEach(() => {
    history = createHistory();
    Object.keys(authMock).forEach(key => authMock[key].mockClear());
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('throws if not inside the Authenticator', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      ReactDOM.render(
        <Logout>{jest.fn()}</Logout>,
        node,
      );
    }).toThrow();

    spy.mockRestore();
  });

  it('throws if not a function is specified as child', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      ReactDOM.render(
        <Router history={history}>
          <Authenticator auth={authMock}>
            <Logout>
              <div />
            </Logout>
          </Authenticator>
        </Router>,
        node,
      );
    }).toThrow();

    spy.mockRestore();
  });

  it('passes proper arguments to the child function', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Logout>{renderer}</Logout>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    expect(Object.keys(renderer.mock.calls[0][0])).toHaveLength(1);
    expect(renderer.mock.calls[0][0].logout).toBeDefined();
  });

  it('delegates logout to auth', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Logout>{renderer}</Logout>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    const { logout } = renderer.mock.calls[0][0];

    expect(authMock.logout.mock.calls).toHaveLength(0);
    logout();
    expect(authMock.logout.mock.calls).toHaveLength(1);
  });
});
