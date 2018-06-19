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

  static init = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value)).done();
    } catch (error) {
      console.log('init() error');
    }
  };


  static set = async (key, value) => {
    try {
      return await AsyncStorage.mergeItem(key, JSON.stringify(value));
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

  static addTransactionBill = async(key, newBill) => {
    Storages.get(key).then(res => {
      const newMap = (newBill).concat(res.transactionBillMap);
      Storages.set(key, { transactionBillMap: newMap });
    }).catch(() => console.log('addTransactionBill() error'));
  };

  static addBill = async(key, newBill) => {
    Storages.get(key).then(res => {
      (res.bills).push(newBill);
      Storages.set(key, { bills: res.bills });
    }).catch(() => console.log('addBill() error'));
  };

  static getFriendByEmail = async(key, email) => {
    var myfriend = null;
    await Storages.get(key).then(res => {
      for (const friend of res.friends) {
        if (friend.email === email) {
          myfriend = friend;
        }
      }
    }).catch(() => console.log('getFriendByEmail() error'));
    return myfriend;
  };

  static getTotalAmount = async (key) => {
    var total = 0;
    await Storages.get(key).then(res => {
      const txList = res.transactionBillMap;
      for (const tx of txList) {
          total += parseFloat(tx.amount);
      }
    }).catch(() => console.log('getTotalAmount() error'));
    return total.toFixed(2);
  };

  static getTotalInOut = async (key) => {
    var totalIN = 0;
    var totalOUT = 0;
    await Storages.get(key).then(res => {
      const txList = res.transactionBillMap;
      for (const tx of txList) {
        if (tx.amount[0] === '+') {
          totalIN += parseFloat(tx.amount);
        } else if (tx.amount[0] === '-') {
          totalOUT += parseFloat(tx.amount);
        }
      }
    }).catch(() => console.log('getTotalAmount() error'));
    return { in: totalIN.toFixed(2), out: totalOUT.toFixed(2) };
  };

  // static getTotalOUT = async (key) => {
  //   var total = 0;
  //   await Storages.get(key).then(res => {
  //     const txList = res.transactionBillMap;
  //     for (const tx of txList) {
  //         total += parseFloat(tx.amount);
  //     }
  //   }).catch(() => console.log('getTotalAmount() error'));
  //   return total.toFixed(2);
  // };

    static getUsername = async (key) => {
    var username = '';
    await Storages.get(key).then(res => {
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
