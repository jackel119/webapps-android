import { AsyncStorage } from 'react-native';

class Storages {

  static get(key) {
    try {
      return AsyncStorage.getItem(key).then((value) => {
        if (value == null) { console.log('get() returns null'); return; }
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
  static addTX(key, newTX) {
    return Storages.get(key).then((items) => {
      try {
        //const newTXlist = [newTX].concat(items.trans);
        const newTXlist = (items.trans).concat(newTX);
        const result = { userData: items.userData, trans: newTXlist, friends: items.friends };
        //const result = Object.assign({}, items, { trans: newTXlist });
        return Storages.set(key, result);
      } catch (error) {
        console.log('addTX() error');
      }
    });
  }

  static getFriendUID(key, email) {
    return Storages.get(key).then((res) => {
      try {
        console.log('getting FriendUID');
        const friendList = res.friends;
        for (const friend of friendList) {
          if (friend.email === email) {
            return friend.uid;
          }
        }
      } catch (error) {
        //TODO: set an alert
        console.log('You dont have this friend!');
      }
    });
  }

  // static update(key, value) {
  //   return Storages.get(key).then((item) => {
  //     try {
  //       value = typeof value === 'string' ? value : Object.assign({}, item, value);
  //       return AsyncStorage.setItem(key, JSON.stringify(value));
  //     } catch (error) {
  //       console.log('update() error');
  //     }
  //   });
  // }

}

export default Storages;
