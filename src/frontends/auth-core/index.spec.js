import {
  Auth,
  InMemoryStore,
  MockAuthProvider,
} from './index';

describe('Package public API', () => {
  it('exports necessary modules', () => {
    expect(Auth).toBeDefined();
    expect(InMemoryStore).toBeDefined();
    expect(MockAuthProvider).toBeDefined();
  });
});
