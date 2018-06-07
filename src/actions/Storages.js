import { AsyncStorage } from 'react-native';

class Storages {

static get(key) {
    try {
      return AsyncStorage.getItem(key).then((value) => {
        const parsedValue = JSON.parse(value);
        return parsedValue;
      });
    } catch (error) {
      console.log('get() error');
    }
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

  //Add one new TX
  static add(key, value) {
    return Storages.get(key).then((items) => {
      try {
        const result = Object.assign({}, items, value);
        return Storages.set(key, result);
      } catch (error) {
        console.log('add() error');
      }
    });
  }

  static update(key, value) {
    return Storages.get(key).then((item) => {
      try {
        value = typeof value === 'string' ? value : Object.assign({}, item, value);
        return AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log('update() error');
      }
    });
  }

}

export default Storages;
