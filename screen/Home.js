/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  // const [value, setValue] = useState('');

  // useEffect(() =>{
  //   let c = async () => {
  //     try {
  //       const value2 = await AsyncStorage.getItem('@user');
  //       if (value2 !== null) {
  //         // We have data!!
  //         setValue(value2);
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //       console.log(error);
  //     }
  //   }
  //   c()
  // },[])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'yellow'}}>Hello</Text>
    </View>
  );
};

export default Home
