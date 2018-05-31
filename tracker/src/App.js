import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	// componentWillMount() {
	// 	const config = {
	// 		apiKey: 'AIzaSyANioEYzpzbNpXELf6CV7gkZW2JCPQRhtM',
	// 		authDomain: 'manager-fa7b3.firebaseapp.com',
	// 		databaseURL: 'https://manager-fa7b3.firebaseio.com',
	// 		projectId: 'manager-fa7b3',
	// 		storageBucket: 'manager-fa7b3.appspot.com',
	// 		messagingSenderId: '782159610243'
	// 	};
	// 	firebase.initializeApp(config);
	// }

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
		return (
				<Provider store={store}>
					<Router />
				</Provider>
		);
	}
}

export default App;
