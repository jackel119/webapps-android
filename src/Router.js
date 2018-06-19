import React from 'react';
import { Scene, Router, Drawer, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';
import AddBill from './components/AddBill';
import TransactionHistory from './components/TransactionHistory';
import ImageComponent from './components/ImageComponent';
import Setting from './components/Setting';
import FriendsList from './components/FriendsList';
import GroupList from './components/GroupList';
import AddNewFriends from './components/AddNewFriends';
import DrawerContent from './DrawerContent';
import SplitBill from './components/SplitBill';
import BillDetails from './components/BillDetails';
import BillHistory from './components/BillHistory';
import CameraRollComponent from './components/CameraRollComponent';

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
          //initial
          hideNavBar
          key="drawer"
          contentComponent={DrawerContent}
          drawerWidth={300}
        >
          <Scene intial key="main">
            <Scene
              //initial
              key="homepage"
              component={Homepage}
              title="Home"
              hideNavBar
            />
            <Scene
              //initial
              key="addBill"
              component={AddBill}
              title="Add Bill"
              onRight={() => Actions.camera()}
              rightTitle="Camera"
            />

            <Scene
              //initial
              key="camera"
              component={CameraComponent}
              title="Scan Receipt"
            />

            <Scene
              key="transactionHistory"
              component={TransactionHistory}
              title="Transaction History"
            />

            <Scene
              key="billHistory"
              component={BillHistory}
              title="Bill History"
            />


            <Scene
              // initial
              key="billDetails"
              component={BillDetails}
              title="Bill Details"
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
              //initial
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

            <Scene
              // initial
              key="cameraRoll"
              component={CameraRollComponent}
              title="CameraRoll"
            />

          </Scene>
        </Drawer>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
