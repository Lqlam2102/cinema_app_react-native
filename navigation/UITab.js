/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import {IconHome, IconDownload, IconVideo} from '../constants/icons';
//My screen
import {Home, Login, Register} from '../screen';

const Tab = createBottomTabNavigator();
const screenOptions = ({route})=>({
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: '#5B5B5B',
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    backgroundColor: 'black',
    borderTopColor: "black",
  },
  // tabBarBackground: ()=>(
  //   <View style ={{backgroundColor: 'black', flex:1}}></View>
  // ),
  headerShown: false,
})

const UITab = (props) => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Login}
        options={{
          tabBarIcon: ({color}) => (
            IconHome(color)
          ),
        }}
      />
      <Tab.Screen
        name="Coming Soon"
        component={Register}
        options={{
          tabBarIcon: ({color}) => (
            IconVideo(color)
          ),
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            IconDownload(color)
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UITab;
