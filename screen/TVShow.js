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
  flex-direction: column;
  width: 100%;
`;

const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 30) / 100)}px;
  height: 200px;
  border-radius: 10px;
`;

const MovieCard = styled.View`
  padding-right: 9px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const Description = styled.View`
  padding-left: 10px;
  width: 68%;
`;
const TextName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  align-items:center;
  width: 100%;
`;
const TextChap = styled.Text`
  color: #fff;
  font-size: 14px;
  margin: 10px 0;
`;
const Badges = styled.Text`
  font-size: 10px;
  color: #fff;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
`;
const Tags = styled.View`
  flex-direction: row;
`;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const TVShow = ({route}) => {
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
    setLoading(true);
    fetch(
      'https://ophim1.cc/_next/data/4Ty7510PdBWqP8sPF1ThI/danh-sach/tv-shows.json?slug=tv-shows',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(json => {
        setMovies(json?.pageProps?.data);
        setLoading(false);
      })
      .catch(error => {
        alert('Tải dữ liệu thất bại');
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
        <Container refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <Header login={true} goBack={navigation.goBack} label="TV Show" />
          <MovieScroll>
            {movies?.items?.map((movie, item) => {
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
                      source={{uri: `http://img.ophim1.cc/uploads/movies/${movie?.thumb_url}`}}
                    />
                    <Description>
                      <TextName>{movie?.name}</TextName>
                      <TextChap>{movie?.episode_current}</TextChap>
                      <Tags>
                      <Badges style = {{backgroundColor: '#6D67E4'}} >{movie?.year}</Badges>
                      <Badges style = {{backgroundColor: '#453C67'}} >{movie?.country[0]?.name}</Badges>
                      </Tags>
                    </Description>
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

export default TVShow;
