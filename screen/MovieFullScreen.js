/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import Video, {TextTrackType} from 'react-native-video';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Lottie from 'lottie-react-native';

const MovieFullScreen = () => {
  let video = useRef();
  const [isFull, setIsFull] = useState('false');
  useEffect(()=>{

 })
  return (
    // <Lottie source={require('../assets/34590-movie-theatre.json')} autoPlay loop />
    <View style={{flex: 1}}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        poster="https://www.w3schools.com/html/pic_trulli.jpg"
        // paused = {true}
        resizeMode="contain"
        ref={ref => {
          video = ref;
        }}
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        style={styles.backgroundVideo}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

export default MovieFullScreen;
