import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

//ignore isMountedWarning
console.disableYellowBox = true;
AppRegistry.registerComponent('tracker', () => App);
