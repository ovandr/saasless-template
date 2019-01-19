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
    return await this.awsAuth.currentUserInfo();
  }

  async login(formData) {
    await this.awsAuth.signIn(formData.email, formData.password);
  }

  async signUp(formData) {
    await this.awsAuth.signUp({
      username: formData.email,
      password: formData.password,
      attributes: {
        email: formData.email
      }
    });
    await this.login(formData);
    return {
      email: formData.email,
      title: formData.email.substr(0, formData.email.indexOf('@')),
    };
  }

  async sendVerificationCode(formData) {
    await this.awsAuth.resendSignUp(formData.email);
  }

  async verify(formData) {
    await this.awsAuth.confirmSignUp(formData.email, formData.code);
  }

  async logout() {
    await this.awsAuth.signOut();
  }
}
