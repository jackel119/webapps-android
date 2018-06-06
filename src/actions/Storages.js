import { AsyncStorage } from 'react-native';

class Storages {

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      if (value) {
        try {
          value = JSON.parse(value);
        } catch (error) {
          console.log('get() error');
        }
      }
      return value;
    });
  }

  static set(key, value) {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('set() error');
    }
  }

  static delete(key) {
    try {
      return AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('delete() error');
    }
  }

  static getAllKeys() {
    try {
      return AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('getAllKeys() error');
    }
  }

  static clearAll() {
    try {
      return AsyncStorage.clear();
    } catch (error) {
      console.log('clearAll() error');
    }
  }

  static update(key, value) {
      return Storages.get(key).then((item) => {
          value = typeof value === 'string' ? value : Object.assign({}, item, value);
          return AsyncStorage.setItem(key, JSON.stringify(value));
      });
  }

}

export default Storages;
