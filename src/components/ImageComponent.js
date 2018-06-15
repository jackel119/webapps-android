import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, Text } from 'react-native';
import { Button, CardSection, Card, Spinner } from './common';
import config from '../../config.json';

export default class ImageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      generating: false
    };
  }

  onButtonPress() {
    this.setState({ generating: true });
    // console.log(this.props);
    // send and get back
    // console.log(this.props.base64);
    fetch(config.googleCloud.api + config.googleCloud.apiKey, {
    method: 'POST',
    body: JSON.stringify({
      "requests": [
        {
          "image": {
            "content": this.props.base64
          },
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ]
        }
      ]
    })
    }).then((response) => {
      console.log(response.responses[0].fullTextAnnotation);
      return response.json();
    }).then(res => res.responses[0].fullTextAnnotation.text.split('\n'))
    .then(res => {
      console.log(res);
      return res;
    })
    .then(res => {
      console.log('before going in');
      Actions.addTransaction({
        scannedItems: [
        {
          name: 'total',
          price: this.parseReceipt(res)
        }
        ]
      });
    })
    .catch((err) => {
      console.error('promise rejected');
      console.error(err);
    });
  }


  parseReceipt(file) {
    var currencies = ['£', '€', '$'];
    var items = [];
    var prices = [];
    var tobreak = false;
    for (var line of file) {
      if (currencies.includes(line.charAt(0))) {
        if (/\d/.test(line) || /\d/.test(line.substring(1, line.length))) {
          prices.push(line.substring(1, line.length));
        }
      } else if (/^\d*\.?\d*$/.test(line)) {
        prices.push(line);
      } else {
        items.push(line);
      }
      if (line.toLowerCase().includes('total') && !line.toLowerCase().includes('sub-total') && line.toLowerCase() != ('total savings')) {
        tobreak = true;
        continue;
      }

      if (tobreak) {
        break;
      }
    }

    console.log('items:', items);
    console.log('prices:', prices);

    return (prices.slice(-1)[0]);
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
