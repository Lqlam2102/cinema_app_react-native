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

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Home = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(true)
      fetch('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1', {
        method: 'GET',
      })
        .then(res => res.json())
        .then(json => {
          setMovies(json);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          alert('Tải dữ liệu thất bại');
          console.log(error.message);
        });
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
          source={{
            uri: 'https://cdn.vox-cdn.com/thumbor/9PqzVk9RnfW0g22byhIyRSPDBYM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/8832449/strangerthings.jpg',
          }}>
          <LinearGradient
            style={{height: '101%'}}
            locations={[0, 0.2, 0.5, 0.94]}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,0.0)',
              'rgba(0,0,0,1)',
            ]}>
            <Header login={true} navigation={navigation} />
            <HeaderTabs />
            <Hero user={true} />
          </LinearGradient>
          {/* <Header login={true} navigation={navigation} /> */}
        </Poster>
        { !isLoading ? (
           movies && (<React.Fragment>
            <Movies
              label={'VNUF TV'}
              item={movies}
            />
            <Movies
              label={'VNUF shows'}
              item={movies2}
            />
            <Movies
              label={'VNUF Horror'}
              item={movies3}
            />
          </React.Fragment>)
        ) : (
            <ActivityIndicator style= {{marginTop:60}} size="large" color="#fff" />
        )}
      </Container>
    </>
  );
};

export default Home;
