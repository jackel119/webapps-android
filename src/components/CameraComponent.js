import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class CameraComponent extends Component {
  takePicture = async function(){
    if (this.camera) {
      const options = { quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      Actions.imageDisplay(data);
      // {base, height, width, uri}
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraStyle}
          type={RNCamera.Constants.Type.back}
          //  autoFocus={RNCamera.Constants.AutoFocus.off}
          //flashMode={RNCamera.Constants.FlashMode.on}
        >
          <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}
          >
            PRESS HERE
          </Text>
        </RNCamera>
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
