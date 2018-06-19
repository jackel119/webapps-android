import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';
import Storages from './../actions/Storages';

const Global = require('./../Global');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class GraphComponent extends Component {
  componentWillMount() {
    Storages.get(Global.EMAIL).then(res => {
      console.log('transactionBillMap', res.transactionBillMap);
      var inls = [];
      var outls = [];
      console.log('inls', inls);
      console.log('outls', outls);
      (res.transactionBillMap).map(tx => {
        if (tx.amount[0] === '+'){
          inls.push({ date: tx.time, amount: tx.amount });
        } else if (tx.amount[0] === '-') {
          outls.push({ date: tx.time, amount: tx.amount });
        }
      });
      console.log('inls', inls);
      console.log('outls', outls);
    });
  }

  render() {
    let data = [
      [{
        "x": 0,
        "y": 4
      }, {
        "x": 1,
        "y": 40
      }, {
        "x": 2,
        "y": 7
      }, {
        "x": 3,
        "y": 73
      }, {
        "x": 4,
        "y": 58
      }, {
        "x": 5,
        "y": 40
      }, {
        "x": 6,
        "y": 72
      }]
    ]
     let data2 = [
      [{
        "x": 0,
        "y": 47
      }, {
        "x": 1,
        "y": 48
      }, {
        "x": 2,
        "y": 77
      }, {
        "x": 3,
        "y": 73
      }, {
        "x": 4,
        "y": 25
      }, {
        "x": 5,
        "y": 57
      }, {
        "x": 6,
        "y": 72
      }]
    ]

    let options = {
      width: 250,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 35,
        bottom: 30,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [
          {value:'name1'},
          {value:'name2'},
          {value:'name3'},
          {value:'name4'},
          {value:'name5'},
          {value:'name6'},
          {value:'name7'}
        ],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }

    };

    return (
      <View style={styles.container}>
        <StockLine data={data} options={options} xKey='x' yKey='y' />
        <StockLine data={data2} options={options} xKey='x' yKey='y' />
      </View>
    );
  }
}

export default GraphComponent;

