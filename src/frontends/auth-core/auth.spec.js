import { Auth } from './auth';
import { MockAuthProvider } from './providers/mock-auth-provider';

describe('Auth', () => {
  describe('#constructor', () => {
    it('exposes the public API', () => {
      const auth = new Auth({ provider: new MockAuthProvider() });

      expect(auth.isAuthenticated).toBeDefined();
      expect(auth.signUp).toBeDefined();
      expect(auth.login).toBeDefined();
      expect(auth.logout).toBeDefined();
      expect(auth.verify).toBeDefined();
      expect(auth.sendConfirmationCode).toBeDefined();
      expect(auth.getUser).toBeDefined();
    });

    it('has default configuration', () => {
      const auth = new Auth({ provider: new MockAuthProvider() });
      expect(auth.getLoginPath()).toBe('/login');
    });
  });

  describe('#signUp', () => {
    const provider = {
      signUp: jest.fn(),
    };

    const auth = new Auth({ provider });

    beforeEach(() => {
      provider.signUp.mockReset();
    });

    it('resolves if its provider resolves', () => {
      const resolveValue = {};
      provider.signUp.mockReturnValueOnce(Promise.resolve(resolveValue));
      return expect(auth.signUp({})).resolves.toBeUndefined();
    });

    it('rejects if its provider rejects', () => {
      const rejectValue = {};
      provider.signUp.mockReturnValueOnce(Promise.reject(rejectValue));
      return expect(auth.signUp({})).rejects.toBe(rejectValue);
    });

    it('passes sign up options to its provider', () => {
      expect.assertions(1);
      const options = {};

      provider.signUp.mockReturnValueOnce(Promise.resolve());
      return auth.signUp(options).then(() => {
        expect(provider.signUp.mock.calls[0][0]).toBe(options);
      });
    });
  });

  describe('#login', () => {
    const provider = {
      login: jest.fn(),
    };
    const auth = new Auth({ provider });
    const history = {
      replace: jest.fn(),
    };

    beforeEach(() => {
      provider.login.mockReset();
      history.replace.mockClear();
      history.location = {};
      auth.setNavigationHistory(history);
    });

    it('resolves if its provider resolves', () => {
      const resolveValue = {};
      provider.login.mockReturnValueOnce(Promise.resolve(resolveValue));
      return expect(auth.login({})).resolves.toBeUndefined();
    });

    it('rejects if its provider rejects', () => {
      const rejectValue = {};
      provider.login.mockReturnValueOnce(Promise.reject(rejectValue));
      return expect(auth.login({})).rejects.toBe(rejectValue);
    });

    it('passes login options to its provider', () => {
      expect.assertions(1);
      const options = {};

      provider.login.mockReturnValueOnce(Promise.resolve());
      return auth.login(options).then(() => {
        expect(provider.login.mock.calls[0][0]).toBe(options);
      });
    });

    it('redirects back after authentication', () => {
      provider.login.mockReturnValueOnce(Promise.resolve({}));
      history.location = {
        search: '?redirect=/back-uri',
      };
      return auth.login({}).then(() => {
        expect(auth.history.replace.mock.calls).toHaveLength(1);
        expect(auth.history.replace.mock.calls[0][0]).toBe('/back-uri');
      });
    });
  });

  describe('getUser', () => {
    const provider = {
      login: jest.fn(),
    };
    const auth = new Auth({ provider });

    beforeEach(() => {
      provider.login.mockReset();
    });

    it('returns undefined without login', () => {
      expect(auth.getUser()).resolves.toBeUndefined();
    });
  });
});
