import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import { Button, CardSection, Card } from './common';


export default class ImageComponent extends Component {
  onButtonPress() {
    console.log(this.props);
    // send and get back
    Actions.addTransaction({ scannedAmount: '8.40', scannedDate: '08/06/2018' });
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
          <Button onPress={this.onButtonPress.bind(this)}>
            Generate Transaction
          </Button>
        </CardSection>

      </Card>
    );
  }
}

