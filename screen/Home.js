/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, {useState} from 'react';
import Header from '../components/Header';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {StatusBar, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTabs from '../components/HeaderTabs';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation, route}) => {
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [movies3, setMovies3] = useState([]);
  const [movies4, setMovies4] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh(!refresh);
    wait(100).then(() => setRefreshing(false));
  }, [refresh]);
  const user = route.params?.user;
  useEffect(() => {
    setIsLoading(true);
    setIsLoading2(true);
    setIsLoading3(true);
    setIsLoading4(true);
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
        alert('Tải dữ liệu phim mới cập nhật thất bại');
        console.log(error.message);
      });
    fetch(
      'https://ophim1.cc/_next/data/4Ty7510PdBWqP8sPF1ThI/danh-sach/phim-le.json?slug=phim-le',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(json => {
        setMovies2(json?.pageProps?.data);
        setIsLoading2(false);
      })
      .catch(error => {
        setIsLoading2(false);
        alert('Tải dữ liệu phim lẻ thất bại');
        console.log(error.message);
      });
    fetch(
      'https://ophim1.cc/_next/data/4Ty7510PdBWqP8sPF1ThI/danh-sach/phim-bo.json?slug=phim-bo',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(json => {
        setMovies3(json?.pageProps?.data);
        setIsLoading3(false);
      })
      .catch(error => {
        setIsLoading3(false);
        alert('Tải dữ liệu phim bộ thất bại');
        console.log(error.message);
      });
    fetch(
      'https://ophim1.cc/_next/data/4Ty7510PdBWqP8sPF1ThI/danh-sach/hoat-hinh.json?slug=hoat-hinh',
      {
        method: 'GET',
        // agent: {rejectUnauthorized: false},
      },
    )
      .then(res => res.json())
      .then(json => {
        setMovies4(json?.pageProps?.data);
        setIsLoading4(false);
      })
      .catch(error => {
        setIsLoading3(false);
        alert('Tải dữ liệu hoạt hình thất bại');
        console.log(error.message);
      });
  }, [refresh]);
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
            <Header user={user} navigation={navigation} />
            <HeaderTabs user={user} />
            <Hero user={user} refresh={refresh} />
          </LinearGradient>
          {/* <Header login={true} navigation={navigation} /> */}
        </Poster>
        {/* { !isLoading ? (
           movies && (<React.Fragment>
            <Movies
              label={'VNUF TV'}
              item={movies}
              user={user}
            />
            <Movies
              label={'VNUF shows'}
              item={movies2}
              user={user}
            />
            <Movies
              label={'VNUF Horror'}
              item={movies3}
              user={user}
            />
          </React.Fragment>)
        ) : (
            <ActivityIndicator style= {{marginTop:60}} size="large" color="#fff" />
        )} */}
        <React.Fragment>
          {!isLoading ? (
            <Movies label={'Mới cập nhật'} movies={movies} user={user} />
          ) : (
            <ActivityIndicator
              style={{marginTop: 60}}
              size="large"
              color="#fff"
            />
          )}
          {!isLoading2 ? (
            <Movies label={'Phim lẻ'} movies={movies2} user={user} />
          ) : (
            <ActivityIndicator
              style={{marginTop: 60}}
              size="large"
              color="#fff"
            />
          )}
          {!isLoading3 ? (
            <Movies label={'Phim bộ'} movies={movies3} user={user} />
          ) : (
            <ActivityIndicator
              style={{marginTop: 60}}
              size="large"
              color="#fff"
            />
          )}
          {!isLoading4 ? (
            <Movies label={'Phim hoạt hình'} movies={movies4} user={user} />
          ) : (
            <ActivityIndicator
              style={{marginTop: 60}}
              size="large"
              color="#fff"
            />
          )}
        </React.Fragment>
      </Container>
    </>
  );
};

export default Home;
