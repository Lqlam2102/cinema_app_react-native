/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, {useState} from 'react';
import Header from '../components/Header';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import { ActivityIndicator } from "react-native";
import {StatusBar, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTabs from '../components/HeaderTabs';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import {useEffect} from 'react';
import { movies2, movies3 } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 110) / 100}px;
`;

const ComingSoon = ({navigation,route}) => {
  const user = route.params?.user;
  useEffect(() => {
  }, []);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster
          source={require("../assets/comingsoon.png")}>
            <Header user={user} navigation={navigation} label = "Mới & Hot" />
          </Poster>
      </Container>
    </>
  );
};

export default ComingSoon;
