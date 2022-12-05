/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */



import React, {useState} from 'react';
import Header from '../components/Header';
import styled from 'styled-components/native';
import {StatusBar, Dimensions} from 'react-native';
const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 110) / 100}px;
`;

const Download = ({navigation, route}) => {
  const user = route.params?.user;
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Poster
          source={require("../assets/download.png")}>
            <Header user={user} navigation={navigation} label = "Tải xuống" />
          </Poster>
      </Container>
    </>
  );
};

export default Download;
