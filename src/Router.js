import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';
import AddTransaction from './components/AddTransaction';
import ExpensePage from './components/ExpensePage';
import ImageComponent from './components/ImageComponent';
import Setting from './components/Setting';
import FriendsList from './components/FriendsList';
import DrawerContent from './DrawerContent';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar sceneStyle={{ paddingTop: 64 }}>
        <Scene 
          initial 
          key="login"
          component={LoginForm}
          title="Please Login"
        />
        <Drawer
          // initial
          hideNavBar
          key="drawer"
          contentComponent={DrawerContent}
          drawerWidth={300}
        >
          <Scene key="main">
            <Scene
              initial
              key="homepage"
              component={Homepage}
              title="Home"
              //onLeft="Menu"
              // hideNavBar
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
              key="expensePage"
              component={ExpensePage}
              title="Transaction History"
            />
            <Scene
              key="imageDisplay"
              component={ImageComponent}
              title="Scanned Image"
            />

            <Scene
              key="friendsList"
              component={FriendsList}
              title="FriendsList"
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
