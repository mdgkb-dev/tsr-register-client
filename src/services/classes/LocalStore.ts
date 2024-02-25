import LocalStoreKeys from '@/services/interfaces/LocalStoreKeys';

export default abstract class LocalStore {
  static Get<T>(key: LocalStoreKeys): T | undefined {
    const item = localStorage.getItem(key);
    if (!item) {
      return undefined;
    }
    return JSON.parse(item);
  }

  static Set(key: LocalStoreKeys, item: unknown) {
    if (!item) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

  static Remove(key: LocalStoreKeys) {
    localStorage.removeItem(key);
  }
}
