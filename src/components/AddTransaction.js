import React, { Component } from 'react';
import { View, StatusBar, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './common';
import { transactionCreate, transactionUpdate, transactionInitiate } from '../actions';

class AddTransaction extends Component {

  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.transactionInitiate({ 
      amount: this.props.scannedAmount, 
      date: this.props.scannedDate });
  }

  onBottunPress() {
    console.log(this.props);
    const { to, from, date, currency, amount } = this.props;
    this.props.transactionCreate({ to, from, date, currency, amount });
  }

  render() {
    return (
      <View>
        <Card>
          <StatusBar barStyle="dark-content" />
          <CardSection>
            <Input
              label="To"
              placeholder="To"
              value={this.props.to}
              onChangeText={value => this.props.transactionUpdate({ prop: 'to', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="From"
              placeholder="From"
              value={this.props.from}
              onChangeText={value => this.props.transactionUpdate({ prop: 'from', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Date"
              placeholder="Date"
              value={this.props.date}
              onChangeText={value => this.props.transactionUpdate({ prop: 'date', value })}
            />
          </CardSection>

          <CardSection>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Currency</Text>
              <Picker
                selectedValue={this.props.value}
                style={styles.inputStyle}
                onValueChange={value => this.props.transactionUpdate({ prop: 'currency', value })}
              >
                <Picker.Item label="Pound" value='1' />
                <Picker.Item label="RMB" value='2' />
              </Picker>
            </View>
          </CardSection>
          
          <CardSection>
            <Input
              label="Amount"
              placeholder="Amount"
              value={this.props.amount}
              onChangeText={value => this.props.transactionUpdate({ prop: 'amount', value })}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onBottunPress.bind(this)}>
              Add New Transaction
            </Button>
          </CardSection>

        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { to, from, date, currency, amount } = state.transaction;
  return { to, from, date, currency, amount };
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};


export default connect(mapStateToProps, { transactionCreate, transactionUpdate, transactionInitiate })(AddTransaction);

