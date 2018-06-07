import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';
import AddTransaction from './components/AddTransaction';
import ImageComponent from './components/ImageComponent';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar sceneStyle={{ paddingTop: 64 }}>
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
        />

        <Scene initial key="main">
          <Scene
            initial
            key="homepage"
            component={Homepage}
            title="Home"
            hideNavBar
          />
          <Scene
            key="addTransaction"
            component={AddTransaction}
            title="Add Transaction"
          />

          <Scene
            key="camera"
            component={CameraComponent}
            title="Scan Receipt"
          />

          <Scene
            key="imageDisplay"
            component={ImageComponent}
            title="Scanned Image"
          />

        </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;
