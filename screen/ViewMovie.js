/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../components/Header';
import Lottie from 'lottie-react-native';

// import Video from 'react-native-video';

const ViewMovie = ({navigation, route}) => {
  const {width, height} = Dimensions.get('screen');
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    fetch(`https://ophim1.com/phim/${route.params.slug}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        setMovie(json.movie);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        alert('Tải dữ liệu thất bại');
        console.log(error.message);
      });
  }, [route]);
  return !isLoading ? (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Container>
        <Header login={true} goBack={navigation.goBack}/>
        <TagEp>{movie?.episode_current}</TagEp>
        <Image
          source={{
            uri: movie?.poster_url,
          }} // Can be a URL or a local file.
          // isMute = {false}
          // shouldPlay={true}
          style={{height: height / 3, width: '100%'}}
        />
        <Title>{movie?.name}</Title>
        <Title style = {{fontSize: 16, marginTop: -5}}>{movie?.origin_name}</Title>
        <MovieSubDetails>
          <MovieBadge>{movie?.quality}</MovieBadge>
          <Subtitle>{movie?.lang} • {movie?.time}</Subtitle>
        </MovieSubDetails>
        {/* <Text style = {{color:"#fff"}}>{movie?.episode_current}</Text> */}
        <ActionButtons>
          <Play activeOpacity={0.5}>
            <Ionicons name="ios-play" size={26} />
            <TextButtonPlay>Play</TextButtonPlay>
          </Play>

          <Download activeOpacity={0.5}>
            <Feather
              name="download"
              size={24}
              style={{color: 'white', margin: 4}}
            />
            <TextButtonDownload>Download</TextButtonDownload>
          </Download>
        </ActionButtons>
        <ScrollView style={{height: height / 5}}>
          <MovieDescription>
            {movie?.content.replace('<p>', '').replace('</p>', '')}
          </MovieDescription>
          <Tags>
              {
                movie?.category.map((tag,i)=>{
                  if (i + 1 === movie?.category.length) {
                    return (<TagWrapper key = {i}>
                        <Tag>{tag.name}</Tag>
                      </TagWrapper>)
                  }
                  else{
                    return (
                      (
                          <TagWrapper key={i}>
                              <Tag>{tag.name}</Tag>
                              <TagDot />
                          </TagWrapper>
                      )
                  )}
                })
              }
          </Tags>
        </ScrollView>

        <ActionButtons2>
          {movie ? (
            <ActionButton activeOpacity={0.5} onPress={() => {}}>
              <Feather name="check" size={35} color="white" />
              <ActionButtonLabel>My List</ActionButtonLabel>
            </ActionButton>
          ) : (
            <ActionButton activeOpacity={0.5} onPress={() => {}}>
              <Ionicons name="add-outline" size={35} color="white" />
              <ActionButtonLabel>My List</ActionButtonLabel>
            </ActionButton>
          )}
          <ActionButton activeOpacity={0.5}>
            <AntDesign
              name="like2"
              size={30}
              color="white"
              style={{marginBottom: 7}}
            />
            <ActionButtonLabel>Rate</ActionButtonLabel>
          </ActionButton>
          <ActionButton activeOpacity={0.5}>
            <AntDesign
              name="sharealt"
              size={27}
              color="white"
              style={{marginBottom: 7}}
            />
            <ActionButtonLabel>Share</ActionButtonLabel>
          </ActionButton>
        </ActionButtons2>
      </Container>
    </>
  ) : (
    // <Lottie source={require('../assets/9103-entertainment.json')} autoPlay loop />
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator style={{marginTop: 60}} size="large" color="#fff" />
    </View>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  margin: 10px;
  font-family: 'Montserrat_700Bold';
`;

const MovieBadge = styled.Text`
  color: #a2a2a2;
  background-color: #373737;
  padding: 2px;
  border-radius: 5px;
  width: 38px;
  text-align: center;
  margin: 15px;
`;

const Subtitle = styled.Text`
  color: #a2a2a2;
  margin: 5px;
`;

const MovieSubDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: -17px;
`;

const Play = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  width: 95%;
  height: 32px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const TextButtonPlay = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
`;

const Download = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #262626;
  width: 95%;
  height: 32px;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

const TextButtonDownload = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: white;
  padding-left: 5px;
`;

const ActionButtons = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const MovieDescription = styled.Text`
  color: white;
  width: 98%;
  margin-left: 10px;
  margin: 10px;
  font-weight: 100;
  font-family: 'Montserrat_300Light';
  line-height: 20px;
  margin-top: 25px;
  padding: 5px;
`;

const Tag = styled.Text`
  color: #fff;
  font-family: 'Montserrat_400Regular';
`;

const TagDot = styled.View`
  margin: 10px;
  background-color: white;
  height: 2px;
  width: 2px;
`;

const Tags = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 10px 0 5px 3px;
  align-items: center;
  flex-wrap: wrap;
  width: 99%;
`;

const TagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ActionButtons2 = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  margin-top: 20px;
`;

const ActionButtonLabel = styled.Text`
  color: white;
  font-family: 'Montserrat_300Light';
  font-size: 15px;
`;
const TagEp = styled.Text`
  color: white;
  position: absolute;
  top: 76px;
  z-index:999;
  background-color: red;
`

export default ViewMovie;
