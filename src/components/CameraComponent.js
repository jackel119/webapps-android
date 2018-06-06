import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class CameraComponent extends Component {
  takePicture() {
    const options = {};

    console.log('Reached Here');
    this.camera.capture({ metadata: options })
      .then((data) => { 
          console.log(data); 
          Actions.addTransaction(); 
        })
      .catch((error) => { console.log(error); });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraStyle}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
          >
            PRESS HERE
          </Text>
        </Camera>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  cameraStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }, 
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
  }
};

export default CameraComponent;
