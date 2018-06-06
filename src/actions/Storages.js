import { AsyncStorage } from 'react-native';

class Storages {

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      if (value) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          //error
        }
      }
      return value;
    });
  }

  static set(key, value) {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      //error
    }
  }

  static delete(key) {
      return AsyncStorage.removeItem(key);
  }

  static getAllKeys() {
    return AsyncStorage.getAllKeys();
  }

  static clearAll() {
    return AsyncStorage.clear();
  }

  // static update(key, value) {
  //     return Storages.get(key).then((item) => {
  //         value = typeof value === 'string' ? value : Object.assign({}, item, value);
  //         return AsyncStorage.setItem(key, JSON.stringify(value));
  //     });
  // }


}

export default Storages;
