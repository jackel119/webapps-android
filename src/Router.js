import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import AddTransaction from './components/AddTransaction';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
          initial
          key="login"
          component={LoginForm}
          title="Please Login"
          sceneStyle={{ paddingTop: 64 }}
        />

        <Scene /*initial*/ key="main">
          <Scene
            initial
            key="homepage"
            component={Homepage}
            title="Home"
            sceneStyle={{ paddingTop: 64 }}
            hideNavBar
          />
          <Scene
            key="addTransaction"
            component={AddTransaction}
            title="Add Transaction"
            sceneStyle={{ paddingTop: 64 }}
          />
        </Scene>

      </Scene>
    </Router>
  );
};

export default RouterComponent;
