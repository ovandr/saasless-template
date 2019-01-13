import parseUrl from 'url-parse';
import { InMemoryStore } from './client-store';
import { CognitoAuthProvider } from './providers/cognito-auth-provider';

function notifySubscribers(eventType, eventData) {
  this.listeners.forEach(l => l({ eventType, eventData }));
}

export class Auth {
  constructor(options) {
    const authOptions = options || {};

    this.options = {
      routing: {
        loginPath: '/signin',
        defaultPath: '/',
        ...authOptions.routing,
      },
      ...authOptions,
    };
    const { sessionStore } = authOptions;
    this.sessionStore = sessionStore || (window && window.localStorage
      ? window.localStorage
      : new InMemoryStore());
    this.currentUser = undefined;
    this.sessionStoreKey = `${this.options.appName || 'Auth'}_credentials`;
    this.provider = authOptions.provider || new CognitoAuthProvider(options.cognito);
    this.listeners = [];
    this.onLogin = this.onLogin.bind(this);
  }

  getLoginPath() {
    return this.options.routing.loginPath;
  }

  subscribe(listener) {
    if(typeof listener !== 'function') {
      throw new Error('An Auth listener should be a function');
    }
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    const newListeners = this.listeners.filter(l => l !== listener);
    this.listeners.length = 0;
    this.listeners.push(...newListeners);
  }

  setNavigationHistory(history) {
    this.history = history;
  }

  async isAuthenticated() {
    return this.provider.isAuthenticated();
  }

  onSignUp(profile) {
    const { onSignUp } = this.options;
    if(onSignUp) {
      onSignUp(profile);
    }
    this.onLogin();
  }

  onLogin() {
    notifySubscribers.call(this, 'loggedIn');
    if(this.history) {
      const { query } = parseUrl(this.history.location.href);
      const backPath = query.redirect || '/';
      this.history.replace(backPath);
    }
  }

  onLogout() {
    notifySubscribers.call(this, 'loggedOut');
  }

  async signUp(options) {
    const profile = await this.provider.signUp(options);
    this.onSignUp(profile);
  }

  async login(options) {
    await this.provider.login(options);
    this.onLogin();
  }

  async sendConfirmationCode(options) {
    await this.provider.sendConfirmationCode(options);
  }

  async verify(options) {
    await this.provider.verify(options);
    this.onLogin();
  }

  async logout() {
    await this.provider.logout();
    this.onLogout();
  }

  async getUser() {
    return this.provider.getUser();
  }
}
