import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';


export default class CameraRollComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      curr: null
    };
  }

  getSelectedImages(images, current) {
    this.setState({
      curr: current
    });
  }

  confirm() {
    console.log(this.state.curr);
    Actions.imageDisplay({ uri: this.state.curr.uri, cameraRoll: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Button onPress={this.confirm.bind(this)}>
            Confirm Picture
          </Button>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={1}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  }
};
