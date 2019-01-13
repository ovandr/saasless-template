export class InMemoryStore {
  constructor() {
    this.testStorage = {};
  }

  setItem(key, value) {
    this.testStorage[key] = value;
  }

  getItem(key) {
    return this.testStorage[key];
  }

  removeItem(key) {
    delete this.testStorage[key];
  }

  clear() {
    this.testStorage = {};
  }
}
