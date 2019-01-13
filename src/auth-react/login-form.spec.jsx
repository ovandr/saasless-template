import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import createHistory from 'history/createMemoryHistory';
import { LoginForm, Authenticator } from './index';

describe('LoginForm', () => {
  const node = document.createElement('div');

  const authMock = {
    isAuthenticated: jest.fn().mockImplementation(() => false),
    setNavigationHistory: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    login: jest.fn().mockImplementation(() => (Promise.resolve())),
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
        <LoginForm>{jest.fn()}</LoginForm>,
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
            <LoginForm>
              <div />
            </LoginForm>
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
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    expect(Object.keys(renderer.mock.calls[0][0])).toHaveLength(5);
    expect(renderer.mock.calls[0][0]).toMatchObject({
      formData: {
        email: '',
        password: '',
      },
      isLogginIn: false,
      error: undefined,
    });
    expect(renderer.mock.calls[0][0].login).toBeDefined();
    expect(renderer.mock.calls[0][0].onFormDataChange).toBeDefined();
  });

  it('passes formData back to the child if it changes', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    const { onFormDataChange } = renderer.mock.calls[0][0];

    onFormDataChange({ email: 'changed_email' });
    expect(renderer.mock.calls).toHaveLength(2);
    expect(renderer.mock.calls[1][0].formData).toEqual({
      email: 'changed_email',
      password: '',
    });

    onFormDataChange({ password: 'changed_pwd', unknown: 'unknown' });
    expect(renderer.mock.calls).toHaveLength(3);
    expect(renderer.mock.calls[2][0].formData).toEqual({
      email: 'changed_email',
      password: 'changed_pwd',
      unknown: 'unknown',
    });
  });

  it('delegates login to auth', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    const { login, onFormDataChange } = renderer.mock.calls[0][0];

    const formData = {
      email: 'email',
      password: 'pwd',
    };
    onFormDataChange(formData);
    expect(authMock.login.mock.calls).toHaveLength(0);
    return login().then(() => {
      expect(authMock.login.mock.calls).toHaveLength(1);
      expect(authMock.login.mock.calls[0][0]).toBe('form');
      expect(authMock.login.mock.calls[0][1]).toEqual(formData);
    });
  });

  it('sets loading state while logging in', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );

    expect(renderer.mock.calls).toHaveLength(1);
    expect(renderer.mock.calls[0][0]).toMatchObject({ isLogginIn: false });
    const { login } = renderer.mock.calls[0][0];

    authMock.login.mockReturnValueOnce(Promise.resolve());
    return login().then(() => {
      expect(renderer.mock.calls).toHaveLength(3);
      expect(renderer.mock.calls[1][0]).toMatchObject({ isLogginIn: true });
      expect(renderer.mock.calls[2][0]).toMatchObject({ isLogginIn: false });
    });
  });

  it('passes login errors to the form', () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );
    expect(renderer.mock.calls).toHaveLength(1);

    const { login } = renderer.mock.calls[0][0];
    const error = new Error('test');
    authMock.login.mockReturnValueOnce(Promise.reject(error));
    return login().then(() => {
      expect(renderer.mock.calls).toHaveLength(3);
      expect(renderer.mock.calls[1][0]).toMatchObject({
        isLogginIn: true,
      });
      expect(renderer.mock.calls[2][0]).toMatchObject({
        isLogginIn: false,
        error,
      });
    });
  });

  it('clear login errors on further attempts', async () => {
    const renderer = jest.fn().mockImplementation(() => null);

    ReactDOM.render(
      <Router history={history}>
        <Authenticator auth={authMock}>
          <LoginForm>{renderer}</LoginForm>
        </Authenticator>
      </Router>,
      node,
    );
    expect(renderer.mock.calls).toHaveLength(1);

    const { login } = renderer.mock.calls[0][0];
    const error = new Error('test');
    authMock.login.mockReturnValueOnce(Promise.reject(error));
    await login();
    expect(renderer.mock.calls).toHaveLength(3);

    authMock.login.mockReturnValueOnce(Promise.resolve());
    return login().then(() => {
      expect(renderer.mock.calls).toHaveLength(5);
      expect(renderer.mock.calls[3][0]).toMatchObject({
        isLogginIn: true,
        error: undefined,
      });
      expect(renderer.mock.calls[4][0]).toMatchObject({
        isLogginIn: false,
        error: undefined,
      });
    });
  });
});
