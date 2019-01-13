import { InMemoryStore } from './index';

describe('InMemoryStore', () => {
  const store = new InMemoryStore();

  beforeEach(() => {
    store.clear();
  });

  it('#setItem, #getItem and #removeItem work', () => {
    expect(store.getItem('test')).toBeUndefined();
    store.setItem('test', 'test value');
    expect(store.getItem('test')).toBe('test value');
    store.removeItem('test');
    expect(store.getItem('test')).toBeUndefined();
  });
});
