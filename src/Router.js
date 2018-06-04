import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import CameraComponent from './components/CameraComponent';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">

        <Scene
          initial
          key="camera"
          component={CameraComponent}
          title="Take A Pic Yo"
          sceneStyle={{ paddingTop: 64 }}
        />
          
        <Scene
          key="login"
          component={LoginForm}
          title="Please Login"
          sceneStyle={{ paddingTop: 64 }}
        />
        
				<Scene
					key="homepage"
					component={Homepage}
					title="Emplyees"
					sceneStyle={{ paddingTop: 64 }}
					hideNavBar
				/>

			</Scene>
		</Router>
	);
};

export default RouterComponent;
