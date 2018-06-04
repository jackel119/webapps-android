import React, { Component } from 'react';
import Camera from 'react-native-camera';
import { Card, CardSection, Button } from './common';

class CameraComponent extends Component {
  takePicture() {
    console.log("HHHHHHHHHHHHHHHHHhhh");

    const options = {};

    this.camera.capture({ metadata: options })
      .then((data) => { console.log(data); })
      .catch((error) => { console.log(error); });
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.cameraStyle}
            aspect={Camera.constants.Aspect.fill}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.takePicture.bind(this)}>
            PRESS
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  cameraStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
};

export default CameraComponent;
