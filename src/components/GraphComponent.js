import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';
import Storages from './../actions/Storages';

const Global = require('./../Global');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  }
});

class GraphComponent extends Component {
  state = {};
  componentWillMount() {
    Storages.get(Global.EMAIL).then(res => {
      console.log('transactionBillMap', res.transactionBillMap);
      var inls = [];
      var outls = [];
      console.log('inls', inls);
      console.log('outls', outls);
      var i = 0;
      var j = 0;
      (res.transactionBillMap).map(tx => {
        if (tx.amount[0] === '+') {
          inls.push({ date: i, amount: parseFloat(tx.amount) });
          i++;
        } else if (tx.amount[0] === '-') {
          outls.push({ date: j, amount: tx.amount });
          j++;
        }
      });
      this.setState({ inls: [inls], outls });
      console.log('inls', inls);
      console.log('outls', outls);
      console.log('state', this.state);
    });
  }

  render() {
    let options = {
      width: 300,
      height: 300,
      color: '#2980B9',
      margin: {
        top: 10,
        left: 50,
        bottom: 30,
        // right: 10
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
        label: {
          fontFamily: 'Arial',
          fontSize: 12,
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
          fontSize: 12,
          fontWeight: true,
          fill: '#34495E'
        }
      }

    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.card}>
          <StockLine data={this.state.inls} options={options} xKey='date' yKey='amount' />
          <StockLine data={this.state.inls} options={options} xKey='date' yKey='amount' />
        </ScrollView>
      </View>
    );
  }
}

export default GraphComponent;
