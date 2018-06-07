import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, Text, View } from 'react-native';
import { Button, CardSection, Card, Spinner } from './common';


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
    setTimeout(() => { 
      Actions.addTransaction({ scannedAmount: '8.40', scannedDate: '08/06/2018' });
      this.setState({ generating: false }); 
      }, 10000);
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

