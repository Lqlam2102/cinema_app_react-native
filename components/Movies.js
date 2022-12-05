/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View`
  padding: 20px 0`;
const Label = styled.Text`
  color: #fff
  font-weight: 700;
  font-size: 23px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 10px;
`;
const MovieScroll = styled.ScrollView`
  padding-left: 10px;
`;
const MovieCard = styled.View`
  padding-right: 9px;
`;
const MoviePoster = styled.Image`
  width: ${Math.round((Dimensions.get('window').width * 35) / 100)}px
  height: 200px;
`;
const Movies = ({label,movies,user}) => {
  const navigation = useNavigation();
  return (
    <Container>
      <Label>{label}</Label>
      <MovieScroll horizontal>
        {movies?.items?.map((movie, id) => {
          return (
            <TouchableOpacity activeOpacity={0.5} key={id} onPress = {()=>{
              navigation.navigate("ViewMovie",{
                slug: movie.slug,
                user: user,
              })
            }}>
              <MovieCard>
                {/* <MoviePoster resizeMode="cover" source={{uri: `http://img.ophim1.cc/uploads/movies/${movie.poster_url}`}} /> */}
              <MoviePoster resizeMode="cover" source={{uri: `https://ophim1.cc/_next/image?url=http%3A%2F%2Fimg.ophim1.cc%2Fuploads%2Fmovies%2F${movie.poster_url}&w=256&q=75`}} />
              </MovieCard>
            </TouchableOpacity>
          );
        })}
      </MovieScroll>
    </Container>
  );
};

export default Movies;
