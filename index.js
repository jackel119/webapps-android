import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

//ignore isMountedWarning
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('tracker', () => App);
