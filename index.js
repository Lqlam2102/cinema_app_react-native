/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './navigation/App';
import {name as appName} from './app.json';
import MovieFullScreen from './screen/MovieFullScreen';
import Test from './screen/Test';

AppRegistry.registerComponent(appName, () => App);
