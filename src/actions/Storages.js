import { AsyncStorage } from 'react-native';

class Storages {

  static get(key) {
      return AsyncStorage.getItem(key).then((value) => {
          const parsedValue = JSON.parse(value);
          return parsedValue;
      });
  }

  static set(key, value) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static delete(key) {
      return AsyncStorage.removeItem(key);
  }

  // static update(key, value) {
  //     return Storages.get(key).then((item) => {
  //         value = typeof value === 'string' ? value : Object.assign({}, item, value);
  //         return AsyncStorage.setItem(key, JSON.stringify(value));
  //     });
  // }


}

export default Storages;
