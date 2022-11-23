/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import ProgressBar from '../components/ProgressBar';
import PlayerControls from '../components/PlayerControls';
import Orientation from 'react-native-orientation-locker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRef} from 'react';
import Slider from '@react-native-community/slider';
import ModalChoiceSpeed from '../components/ModalChoiceSpeed';

// var height = Dimensions.get('window').height;
// var width = Dimensions.get('window').width;

const VideoPlayer = ({route}) => {
  const videoRef = React.createRef();
  const timeOut = useRef();
  var height = Dimensions.get('window').height;
  var width = Dimensions.get('window').width;
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  const [currentTime, setCurrentTime] = useState(0);
  const [bright, setBright] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [isSetBirght, setIsSetBirght] = useState(false);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(true);
  const [showControl, setShowControl] = useState(false);
  const [mute, setMute] = useState(false);
  const [lock, setLock] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
  };
  const handleOnStartSlide = () => {
    setShowControl(false);
    setIsSetBirght(true);
  };
  const handleOnCompleteSlide = () => {
    setShowControl(true);
    setIsSetBirght(false);
  };
  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const handleControls = () => {
    setShowControl(!showControl);
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }
    if (!showControl) {
      timeOut.current = setTimeout(() => setShowControl(false), 5000);
    }
    if (showControl) {
      clearTimeout(timeOut.current);
    }
  };

  const onLoadEnd = data => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onEnd = () => {
    setPlay(false);
    videoRef.current.seek(0);
  };

  return (
    <View style={styles.fullscreenContainer}>
      <TouchableOpacity activeOpacity={lock ? 1 : 0.9} onPress={handleControls}>
        <View
          style={{
            opacity: bright / 10,
          }}>
          <Video
            ref={videoRef}
            source={{
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            poster="https://vnuf.edu.vn/wp-content/uploads/2022/11/Nha-Giao-VN-2022_final.jpg"
            style={{
              flex: 1,
              height: height,
              width: width,
              backgroundColor: 'black',
            }}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            fullscreen={true}
            paused={!play}
            muted={mute}
            rate={speed}
            // playInBackground = {true}
          />

          {showControl && !lock && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                style={{marginLeft: 10, marginTop: 20}}
                onPress={route.params.goBack}>
                <AntDesign name="arrowleft" size={30} color="white" />
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlay}
                onPause={handlePlayPause}
                playing={play}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />

              <ProgressBar
                currentTime={currentTime}
                duration={duration > 0 ? duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setMute(!mute);
                  }}>
                  {mute ? (
                    <Ionicons
                      name="volume-mute-outline"
                      style={{padding: 10}}
                      size={30}
                      color="#d92126"
                    />
                  ) : (
                    <Ionicons
                      name="volume-high-outline"
                      style={{padding: 10}}
                      size={30}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.speed}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <MaterialIcons name="speed" size={20} color="white" />
                  <Text style={styles.textSpeed}>{speed}x</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLock(!lock);
                  }}>
                  <Ionicons
                    name="md-lock-closed-outline"
                    style={{padding: 10}}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {(showControl || isSetBirght) && !lock && (
            <View style={styles.brightContainer}>
              <Entypo
                style={{
                  position: 'absolute',
                  top: -60,
                }}
                name="light-up"
                size={bright + 11}
                color="white"
              />
              <Slider
                style={styles.bright}
                value={bright}
                minimumValue={3}
                maximumValue={10}
                step={1}
                onValueChange={value => {
                  setBright(value);
                }}
                onSlidingStart={handleOnStartSlide}
                onSlidingComplete={handleOnCompleteSlide}
                minimumTrackTintColor={'#fff'}
                maximumTrackTintColor={'#FFFFFF'}
                thumbTintColor={'#fff7ba'}
              />
            </View>
          )}
          {showControl && lock && (
            <TouchableOpacity
              style={styles.lock}
              onPress={() => {
                setLock(!lock);
              }}>
              <Ionicons
                name="md-lock-open-outline"
                style={{
                  padding: 30,
                  position: 'absolute',
                  bottom: 10,
                  right: 400,
                }}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
        <ModalChoiceSpeed
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          speed={speed}
          setSpeed={setSpeed}
          setShowControl={setShowControl}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  fullscreenVideo: {
    flex: 1,
    // height: height,
    // width: width,
    backgroundColor: 'black',
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.8,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  bright: {
    // position: 'absolute',
    // top: '45%',
    height: 10,
    width: 100,
    padding: 10,
    // right: 10,
    transform: [{rotate: '-90deg'}],
  },
  speed: {
    alignItems: 'center',
  },
  lock: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    right: 10,
  },
  textSpeed: {
    color: '#fff',
    fontSize: 10,
  },
  bottomContainer: {
    // position: 'absolute',
    // bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  brightContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '40%',
    right: 20,
  },
});

export default VideoPlayer;
