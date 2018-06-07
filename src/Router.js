import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';
import AddTransaction from './components/AddTransaction';
import ImageComponent from './components/ImageComponent';
import Setting from './components/Setting';

import DrawerContent from './DrawerContent';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar sceneStyle={{ paddingTop: 64 }}>
        <Drawer
          hideNavBar
          key="drawer"
          contentComponent={DrawerContent}
          drawerWidth={300}
        >
          <Scene initial key="main">
            <Scene
              initial
              key="homepage"
              component={Homepage}
              title="Home"
              onLeft="Menu"
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

            <Scene
              key="setting"
              component={Setting}
              title="Setting"
            />
          </Scene>
        </Drawer>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
