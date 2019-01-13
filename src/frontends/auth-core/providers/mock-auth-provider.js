export class MockAuthProvider {
  constructor(options) {
    this.options = {
      ...options,
    };
  }

  async isAuthenticated(...args) {
    const { isAuthenticated } = this.options;

    if (isAuthenticated) {
      return isAuthenticated(...args);
    }

    return { __mock: true };
  }

  async login(...args) {
    const { login } = this.options;

    if (login) {
      return login(...args);
    }

    return { __mock: true };
  }

  async logout(...args) {
    const { logout } = this.options;

    if (logout) {
      return logout(...args);
    }

    return { __mock: true };
  }

  async signUp(...args) {
    const { signUp } = this.options;

    if (signUp) {
      return signUp(...args);
    }

    return { __mock: true };
  }

  async sendVerificationCode(...args) {
    const { sendVerificationCode } = this.options;

    if (sendVerificationCode) {
      return sendVerificationCode(...args);
    }

    return { __mock: true };
  }

  async verify(...args) {
    const { verify } = this.options;

    if (verify) {
      return verify(...args);
    }

    return { __mock: true };
  }
}
