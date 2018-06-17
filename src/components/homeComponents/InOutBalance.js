import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class InOutBalance extends Component {

  state = {
    in: 0,
    out: 0,
  };

  componentWillMount() {
    const email = Global.EMAIL;
    Storages.getTotalInOut(email).then(res => {
      console.log(res);
      this.setState({ in: res.in });
      this.setState({ out: res.out });
    });
  }

  render() {
    const { headerContentStyle,
      inStyle,
      outStyle,
      textStyle,
      fontStyle } = styles;

    return (
      <View style={headerContentStyle}>
        <View style={inStyle}>
          <Text style={fontStyle}>In</Text>
          <Text style={textStyle}>£ {this.state.in}</Text>
        </View>

        <View style={outStyle}>
          <Text style={fontStyle}>Out</Text>
          <Text style={textStyle}>£ {this.state.out}</Text>
        </View>
      </View>
    );
  }


}

const styles = {
  headerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inStyle: {
    flex: 1,
    height: 85,
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#f9ba32',
    //justifyContent: 'space-around'
  },
  outStyle: {
    flex: 1,
    height: 85,
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ff4e50',
    //justifyContent: 'space-around'
  },
  textStyle: {
    fontFamily: 'TitilliumWeb-Regular',
    //margin: 30,
    fontSize: 30,
    textAlign: 'right',
    //justifyContent: 'flex-start',
    color: 'white',
  },
  fontStyle: {
    fontFamily: 'AlegreyaSansSC-Medium',
    color: 'white',
    fontSize: 20
  }
};

export { InOutBalance };
