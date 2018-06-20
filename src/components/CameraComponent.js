import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

class CameraComponent extends Component {
  takePicture = async function(){
    if (this.camera) {
      console.log('reached');
      const options = { quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log('reached');
      Actions.imageDisplay(data, { CameraRoll: false });
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
          autoFocus={RNCamera.Constants.AutoFocus.off}
          //flashMode={RNCamera.Constants.FlashMode.on}
        >
          <View style={{ flex: 0.8 }} />
          <View style={{ flexDirection: 'row', flex: 0.2 }}>
            <TouchableOpacity
              style={styles.capture}
              onPress={this.takePicture.bind(this)}
            >
            <Text style={styles.textStyle}> Take Picture </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.capture}
              onPress={() => Actions.cameraRoll()}
            >
            <Text style={styles.textStyle}> Camera Roll </Text>
            </TouchableOpacity>
          </View>
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
    padding: 15,
    margin: 45,
    height: 50
  }, 
  textStyle: {
    color: 'white'
  }
};

export default CameraComponent;
