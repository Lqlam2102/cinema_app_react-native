/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import Video, {TextTrackType} from 'react-native-video';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Lottie from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MovieFullScreen = ({navigation, route}) => {
  let video = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  const [isFull, setIsFull] = useState('false');
  useEffect(() => {
    Orientation.lockToLandscape();
    video.presentFullscreenPlayer();
    return () => {
      Orientation.unlockAllOrientations();
    };
  });
  return (
    <View style={{flex: 1}}>
      <Video
        source={{
          // uri: route.params.uri,
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        poster="https://vnuf.edu.vn/wp-content/uploads/2022/11/Nha-Giao-VN-2022_final.jpg"
        // paused = {true}
        resizeMode="contain"
        ref={ref => {
          video = ref;
        }}
        onEnd={ () => this.player.seek(0) }
        onLoad={ () => this.player.seek(400) }
        onBuffer={this.onBuffer}
        onError={this.videoError}
        style={styles.backgroundVideo}
      />
      <TouchableOpacity
        style={{marginLeft: 10, marginTop: 10}}
        // onPress={route.params.goBack}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
        {/* <Text>{video.current.seek(200)}</Text> */}
      </TouchableOpacity>

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
