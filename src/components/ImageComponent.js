import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, Text } from 'react-native';
import { Button, CardSection, Card, Spinner } from './common';
import { socket } from '../Global';


export default class ImageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generating: false
    };
    console.log(this.state.generating);
  }

  onButtonPress() {
    this.setState({ generating: true });
    // console.log(this.props);
    // send and get back
    // mock code here
    socket.emit('imageParse', null);
    socket.on('itemizedBill', res => Actions.addTransaction({ scannedItems: res.items }));
  }

  renderButton() {
    if (this.state.generating) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Generate Transaction
      </Button>
    );
  }

  renderText() {
    if (this.state.generating) {
      return (
        <Text style={styles.textStyle}>
          Generating!
        </Text>
      );
    }
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Image 
            style={{ width: 200, height: 200 }}
            source={{ uri: this.props.uri }}
          />
        </CardSection>

        <CardSection>
          {this.renderText()}
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ADD8E6',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};
