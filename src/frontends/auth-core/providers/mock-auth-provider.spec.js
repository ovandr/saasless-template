import { MockAuthProvider } from './mock-auth-provider';

describe('MockAuthProvider', () => {
  describe('#login', () => {
    it('returns mock result by default', async () => {
      const provider = new MockAuthProvider();
      expect(provider.login()).resolves.toBeDefined();
    });

    it('throws if failOnLogin is specified', async () => {
      const failOnLogin = {};
      const provider = new MockAuthProvider({ failOnLogin });
      expect(provider.login()).rejects.toBe(failOnLogin);
    });
  });
});
