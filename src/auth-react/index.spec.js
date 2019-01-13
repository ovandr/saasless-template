import * as exports from './index';

describe('Package public API', () => {
  it('exports modules', () => {
    expect(Object.keys(exports)).toHaveLength(5);
    expect(exports.Authenticator).toBeDefined();
    expect(exports.withAuth).toBeDefined();
    expect(exports.LoginForm).toBeDefined();
    expect(exports.Logout).toBeDefined();
    expect(exports.PrivateRoute).toBeDefined();
  });
});
