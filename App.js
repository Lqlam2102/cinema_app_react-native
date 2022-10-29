/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Login from './screen/Login';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Register from './screen/Register';
import Icon from 'react-native-vector-icons/FontAwesome';
const MyIcon = () => <Icon name="facebook" size={30} color="#900" />;
const App = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default App;
