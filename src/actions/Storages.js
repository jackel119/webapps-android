import { AsyncStorage } from 'react-native';

class Storages {

  static get = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.log('get() error');
    }
  };

  static set = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('set() error');
    }
  };

  static delete = async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log('delete() error');
    }
  };

  static getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('getAllKeys() error');
    }
  };

  static clearAll = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (error) {
      console.log('clearAll() error');
    }
  };

  //Add one new TX
  static addTX = async (key, newTX) => {
    await Storages.get(key).then(items => {
      try {
        const newTXlist = [newTX].concat(items.trans);
        const result = { userData: items.userData, trans: newTXlist, friends: items.friends };
        Storages.set(key, result);
      } catch (error) {
        console.log('addTX() error');
      }
    });
  };

  static getFriendUID = async (key, email) => {
    await Storages.get(key).then(res => {
      console.log('getting FriendUID');
      const friendList = res.friends;
      for (const friend of friendList) {
        if (friend.email === email) {
          return friend.uid;
        }
      }
    }).catch(() => alert('You dont have this friend!'));
  };

  static getTotalAmount = async (key) => {
    var total = 0;
    await Storages.get(key).then(res => {
      const txList = res.trans;
      for (const tx of txList) {
          total += parseFloat(tx.amount);
      }
    }).catch(() => console.log('getTotalAmount() error'));
    return total;
  };

    static getUsername = async (key) => {
    var username = '';
    await Storages.get(key).then(res => {
      console.log(res.userData);
      username = res.userData.first_name;
    }).catch(() => console.log('getTotalAmount() error'));
    return username;
  };

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
