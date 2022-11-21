/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 25px 5px 25px;
  width: 100%;
`;

const Container2 = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  width: 100%;
`;

const Logo = styled.Image`
  width: 23px;
  height: 45px;
`;

const Logo2 = styled.Image`
  width: 125px;
  height: 145px;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 35px;
  border-radius: 20px;
`;

const Avatar2 = styled.Image`
  width: 40px;
  height: 30px;
  border-radius: 20px;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  color: white;
  margin-left: 15px;
  font-size: 18px;
`;

const HeaderLeftSide = styled.View`
  flex-direction: row;
`;
const Header = ({ login, goBack, label }) => {
    const navigation = useNavigation();
    const signOutUser = () => {
    };
    return (
      login ? (
        <Container>
          <HeaderLeftSide>
            {goBack ? (
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={goBack}>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <Logo resizeMode="contain" source={require("../assets/logo.png")} />
            )}
            {label && <HeaderTitle>{label}</HeaderTitle>}
          </HeaderLeftSide>
          <HeaderIcons>
            {goBack ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                //   navigation.navigate("Search");
                }}
              >
                <MaterialIcons
                  name="search"
                  size={30}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  // navigation.navigate("Search");
                }}
              >
                <MaterialIcons
                  name="search"
                  size={35}
                  color="white"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            )}
            {goBack ? (
              <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Avatar2
                  resizeMode="contain"
                  source={{
                    uri: "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41",
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Avatar
                  resizeMode="contain"
                  source={{
                    uri: "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41",
                  }}
                />
              </TouchableOpacity>
            )}
          </HeaderIcons>
        </Container>
      ) : (
        <Container2>
          <Logo2
            resizeMode="contain"
            source={require("../assets/netflixlogo2.png")}
          />
        </Container2>
      ));
  };
  export default Header;
