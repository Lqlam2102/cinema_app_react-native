/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './navigation/App';
import {Home} from './screen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
