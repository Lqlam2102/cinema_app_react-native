/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, {useEffect, useState} from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register, Splash} from '../screen';
import UITab from './UITab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewMovie from './../screen/ViewMovie';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from '../screen/MovieFullScreen';
import MyList from '../screen/MyList';
import Search from '../screen/Search';
import { LogBox } from 'react-native';
import TVShow from '../screen/TVShow';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  navigationBarColor: 'black',
  animation: 'slide_from_right',
};

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        <Stack.Screen name={'UITab'} component={UITab} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen name="ViewMovie" component={ViewMovie} />
        <Stack.Screen name="MovieFullScreen" component={VideoPlayer} />
        <Stack.Screen name="MyList" component={MyList} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="TVShow" component={TVShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
