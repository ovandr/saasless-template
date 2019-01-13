import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { Authenticator, withAuth } from './index';

describe('A <Authenticator>', () => {
  const node = document.createElement('div');
  const authMock = {
    isAuthenticated: jest.fn().mockImplementation(() => false),
    setNavigationHistory: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  };

  let history;
  beforeEach(() => {
    history = createHistory();
    Object.keys(authMock).forEach(key => authMock[key].mockClear());
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
  });

  it('throws if auth is changed on the fly', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    class Tester extends React.Component {
      constructor() {
        super();
        this.state = { authMock };
      }
      changeAuth() {
        this.setState({
          authMock: { ...authMock },
        });
      }
      render() {
        return (
          <Router history={history}>
            <Authenticator auth={this.state.authMock}>
              <div />
            </Authenticator>
          </Router>
        );
      }
    }

    let tester;
    ReactDOM.render(
      <Tester ref={(ref) => { tester = ref; }} />,
      node,
    );

    expect(() => {
      tester.changeAuth();
    }).toThrow();

    spy.mockRestore();
  });

  it('sets history to the auth', () => {
    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <div />
        </Authenticator>
      </Router>,
      node,
    );

    expect(authMock.setNavigationHistory.mock.calls).toHaveLength(1);
    expect(authMock.setNavigationHistory.mock.calls[0][0]).toBe(history);
  });

  it('subscribes to and unsubscribes from auth', () => {
    expect(authMock.subscribe.mock.calls).toHaveLength(0);
    expect(authMock.unsubscribe.mock.calls).toHaveLength(0);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <div />
        </Authenticator>
      </Router>,
      node,
    );

    expect(authMock.subscribe.mock.calls).toHaveLength(1);
    expect(authMock.unsubscribe.mock.calls).toHaveLength(0);

    ReactDOM.unmountComponentAtNode(node);
    expect(authMock.subscribe.mock.calls).toHaveLength(1);
    expect(authMock.unsubscribe.mock.calls).toHaveLength(1);
  });

  it('authentication events force dependencies to update', () => {
    const Cmp = jest.fn().mockImplementation(() => null);
    const CmpWithAuth = withAuth(Cmp);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <Cmp />
          <CmpWithAuth />
        </Authenticator>
      </Router>,
      node,
    );

    expect(Cmp.mock.calls).toHaveLength(2);
    expect(Object.keys(Cmp.mock.calls[0][0])).toHaveLength(0); // props
    expect(Cmp.mock.calls[1][0]).toEqual({
      auth: authMock,
      isAuthenticated: false,
    }); // props

    authMock.subscribe.mock.calls[0][0]({
      eventType: 'unknownEvent',
    });

    expect(Cmp.mock.calls).toHaveLength(2);

    authMock.subscribe.mock.calls[0][0]({
      eventType: 'loggedIn',
    });

    expect(Cmp.mock.calls).toHaveLength(3);
  });

  describe('without an auth provided', () => {
    it('throws an error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        ReactDOM.render(
          <Router history={history}>
            <Authenticator>
              <div />
            </Authenticator>
          </Router>,
          node,
        );
      }).toThrow();

      spy.mockRestore();
    });
  });

  describe('context', () => {
    let authContext;

    const ContextTester = () => (
      <Authenticator.Context.Consumer>
        {(auth) => {
          authContext = auth;
        }}
      </Authenticator.Context.Consumer>
    );

    ContextTester.contextTypes = {
      auth: PropTypes.shape({
        isAuthenticated: PropTypes.func,
        user: PropTypes.shape({
          displayName: PropTypes.string,
        }),
        login: PropTypes.func,
        logout: PropTypes.func,
        getProfile: PropTypes.func,
      }),
    };

    afterEach(() => {
      authContext = undefined;
    });

    it('can be consumed', () => {
      ReactDOM.render(
        <Router history={history}>
          <Authenticator auth={authMock}>
            <ContextTester />
          </Authenticator>
        </Router>,
        node,
      );

      expect(authContext).toEqual({
        auth: authMock,
        isAuthenticated: false,
      });
    });
  });
});
