/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */


import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StatusBar, TouchableOpacity, RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {baseURL} from '../config/Apis';
const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const MovieScroll = styled.View`
  padding-left: 10px;
  margin: 30px;
  margin-left: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 30) / 100)}px;
  height: 200px;
  border-radius: 10px;
`;

const MovieCard = styled.View`
  padding-right: 9px;
`;

const Warning = styled.Text`
  color: #fff;
  font-family: 'Montserrat_400Regular';
  font-size: 23px;
  text-align: center;
`;

const WarningButton = styled.TouchableOpacity`
  background-color: #e7442e;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;

const WarningButtonText = styled.Text`
  color: white;
  font-family: 'Montserrat_300Light';
  font-size: 15px;
`;

const WarningWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  z-index: 50;
  top: 40%;
`;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const MyList = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const user = route?.params?.user;
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh(!refresh);
    wait(100).then(() => setRefreshing(false));
  }, [refresh]);

  useEffect(() => {
    // setLoading(true);
    fetch(`${baseURL}/favorite/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        setMovies(json);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error.message);
      });
  }, [refresh]);

  const navigation = useNavigation();

  return (
    !loading ? (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {movies?.length === 0 && (
          <WarningWrapper>
            <Warning>Không có phim nào trong danh sách của bạn.</Warning>
            <WarningButton
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Home')}>
              <WarningButtonText>Duyệt phim</WarningButtonText>
            </WarningButton>
          </WarningWrapper>
        )}
        <Container refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Header login={true} goBack={navigation.goBack} label="My List" />
          <MovieScroll>
            {movies?.map((movie, item) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={item}
                  onPress={() => {
                    navigation.navigate('ViewMovie', {
                      slug: movie.slug,
                      user: user,
                    });
                  }}>
                  <MovieCard>
                    <MoviePoster
                      resizeMode="cover"
                      source={{uri: movie?.data?.movie?.thumb_url.replace('http:','https:')}}
                    />
                  </MovieCard>
                </TouchableOpacity>
              );
            })}
          </MovieScroll>
        </Container>
      </>
    ):(
      <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <ActivityIndicator style={{marginTop: 60}} size="large" color="#fff" /> */}
      <Lottie source={require('../assets/lf30.json')} autoPlay loop />
    </View>
    )
  );
};

export default MyList;
