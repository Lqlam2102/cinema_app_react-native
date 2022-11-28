/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
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

const MyList = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const user = route?.params?.user;
  useEffect(() => {
    fetch(`${baseURL}/favorite/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.length > 0) {
          setMovies(json);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error.message);
      });
  }, [user]);

  const navigation = useNavigation();

  return (
    true && (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {movies?.length == 0 && (
          <WarningWrapper>
            <Warning>Không có phim nào trong danh sách của bạn.</Warning>
            <WarningButton
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Home')}>
              <WarningButtonText>Duyệt phim</WarningButtonText>
            </WarningButton>
          </WarningWrapper>
        )}
        <Container>
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
                      source={{uri: movie?.data?.movie?.thumb_url}}
                    />
                  </MovieCard>
                </TouchableOpacity>
              );
            })}
          </MovieScroll>
        </Container>
      </>
    )
  );
};

export default MyList;
