import Amplify, { Auth } from 'aws-amplify';

export class CognitoAuthProvider {
  constructor(options) {
    this.options = options || {};

    Amplify.configure({
      Auth: options,
    });

    this.awsAuth = Auth;
  }

  async isAuthenticated() {
    try {
      const result = await this.awsAuth.currentSession();
      return !!result;
    } catch(e) {
      return false;
    }
  }

  async getUser() {
    try {
      return this.awsAuth.currentUserInfo();
    } catch(e) {
      throw { message: e };
    }
  }

  async login(formData) {
    try {
      await this.awsAuth.signIn(formData.email, formData.password);
    } catch(e) {
      throw { message: e };
    }
  }

  async signUp(formData) {
    try {
      await this.awsAuth.signUp({
        username: formData.email,
        password: formData.password,
      });
      await this.login(formData);
      return {
        email: formData.email,
        title: formData.email.substr(0, formData.email.indexOf('@')),
      };
    } catch(e) {
      throw { message: e };
    }
  }

  async sendVerificationCode(formData) {
    try {
      await this.awsAuth.resendSignUp(formData.email);
    } catch(e) {
      throw { message: e };
    }
  }

  async verify(formData) {
    try {
      await this.awsAuth.confirmSignUp(formData.email, formData.code);
    } catch(e) {
      throw { message: e };
    }
  }

  async logout() {
    try {
      await this.awsAuth.signOut();
    } catch(e) {
      throw { message: e };
    }
  }
}
