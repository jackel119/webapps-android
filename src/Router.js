import React from 'react';
import { Scene, Router, Drawer, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';
import AddTransaction from './components/AddTransaction';
import ExpensePage from './components/ExpensePage';
import ImageComponent from './components/ImageComponent';
import Setting from './components/Setting';
import FriendsList from './components/FriendsList';
import GroupList from './components/GroupList';
import AddNewFriends from './components/AddNewFriends';
import DrawerContent from './DrawerContent';
import SplitBill from './components/SplitBill';

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
          <Scene intial key="main">
            <Scene
              initial
              key="homepage"
              component={Homepage}
              title="Home"
              hideNavBar
            />
            <Scene
              //initial
              key="addTransaction"
              component={AddTransaction}
              title="Add Transaction"
            />

            <Scene
              //initial
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
              key="split"
              component={SplitBill}
              title="SplitBill"
            />

            <Scene
              key="friendList"
              component={FriendsList}
              title="Friend List"
              onRight={() => Actions.addFriend()}
              rightTitle="Add"
            />

              <Scene
                key="addFriend"
                component={AddNewFriends}
                title="Add Friends"
              />

            <Scene
              // initial
              key="groupList"
              component={GroupList}
              title="Group List"
              onRight={() => alert("Add Group")}
              rightTitle="Add"
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
