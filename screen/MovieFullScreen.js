/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  AppState,
  StatusBar,
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
import {baseURL} from '../config/Apis';
import ModalWatching from '../components/ModalWatching';
import {useIsFocused} from '@react-navigation/native';
import ModalChoiceChap from '../components/ModalChoiceChap';

const VideoPlayer = ({navigation, route}) => {
  const videoRef = React.createRef();
  const isFocused = useIsFocused();
  const timeOut = useRef();
  let ref_chap = useRef(0);
  let ref_time = useRef(0);
  const appState = useRef(AppState.currentState);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [watching, setWatching] = useState(false);
  const {height, width} = useWindowDimensions();
  const [bright, setBright] = useState(10);
  const [speed, setSpeed] = useState(1);
  const [isSetBright, setIsSetBright] = useState(false);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(true);
  const [showControl, setShowControl] = useState(false);
  const [mute, setMute] = useState(false);
  const [lock, setLock] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChap, setModalChap] = useState(false);
  const [time, setTime] = useState({
    time: 0,
    chap: 0,
  });
  useEffect(() => {
    Orientation.lockToLandscape();
    let rs;
    fetch(`${baseURL}/time/movie/?q=${route.params?.slug}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${route.params?.user}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        setResponse(json);
        if (json.time > 0) {
          setPlay(false);
          setWatching(true);
        }
        rs = json;
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error.message);
      });
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        setPlay(true);
      } else {
        setPlay(false);
        console.log('out');
        if ((rs, ref_time.current > 20)) {
          fetch(`${baseURL}/time/${rs.id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${route.params?.user}`,
            },
            body: JSON.stringify({
              time: ref_time.current,
              chap: ref_chap.current,
            }),
          })
            .then(res => res.json())
            .then(json => {
              console.log(json);
            })
            .catch(error => {
              console.log(error.message);
            });
        }
      }
      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });
    return () => {
      Orientation.unlockAllOrientations();
      if ((rs, ref_time.current > 20)) {
        fetch(`${baseURL}/time/${rs.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${route.params?.user}`,
          },
          body: JSON.stringify({
            time: ref_time.current,
            chap: ref_chap.current,
          }),
        })
          .then(res => res.json())
          .then(json => {
            console.log(json);
          })
          .catch(error => {
            console.log(error.message);
          });
      }
      subscription.remove();
    };
  }, []);
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
    setIsSetBright(true);
  };
  const handleOnCompleteSlide = () => {
    setShowControl(true);
    setIsSetBright(false);
  };
  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
  };

  const skipBackward = () => {
    videoRef.current.seek(time['time'] - 10);
    setTime({...time, time: time['time'] - 10});
    // setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef.current.seek(time['time'] + 10);
    setTime({...time, time: time['time'] + 10});
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
    if (ref_time.current > 0) {
      setTime({...time, time: ref_time.current});
      onSeek({seekTime: ref_time.current});
    } else {
      setTime({...time, time: data.currentTime});
    }
  };

  const onProgress = data => {
    setTime({...time, time: data.currentTime});
    ref_time.current = data.currentTime;
    // alert(ref_time.current)
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setTime({...time, time: data.seekTime});
  };

  const onEnd = () => {
    setPlay(false);
    videoRef.current.seek(0);
  };
  return (
    <>
    <StatusBar hidden = {true} />
    <View style={styles.fullscreenContainer}>
      {/* {timeWatch && (alert("aaa"))} */}
      {/* <Text style = {{color:'white'}}>{mid2}</Text> */}
      <TouchableOpacity activeOpacity={lock ? 1 : 0.9} onPress={handleControls}>
        <View
          style={{
            opacity: bright / 10,
          }}>
          <Video
            ref={videoRef}
            source={{
              // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              uri: route.params?.server_data[time['chap']].link_m3u8,
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
            // onStartShouldSetResponder = {()=> true}
            // onResponderGrant = {(event)=>{
            //   handleControls()
            //   setMid(event.nativeEvent.locationX);
            // }}
            // onResponderMove = {(event)=>{
            //   if(currentTime >= 0 && currentTime <= duration){
            //     setMid2(((event.nativeEvent.locationX - mid) * duration) / (width * 2));
            //   }
            // }}
            // onResponderRelease ={()=>{
            //   onSeek({seekTime: currentTime + mid2});
            // }}
          />

          {showControl && !lock && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                style={{marginLeft: 10, marginTop: 20}}
                onPress={navigation.goBack}>
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
                currentTime={time['time']}
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
                {route.params?.server_data.length > 1 && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalChap(true);
                    }}>
                    <Ionicons
                      name="layers-outline"
                      style={{padding: 10}}
                      size={20}
                      color="white"
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 10,
                        marginTop: -10,
                      }}>
                      Chọn tập
                    </Text>
                  </TouchableOpacity>
                )}
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
          {(showControl || isSetBright) && !lock && (
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
        {!loading && (
          <ModalWatching
            modalVisible={watching}
            setModalVisible={setWatching}
            setShowControl={setShowControl}
            setPlay={setPlay}
            response={response}
            onSlideCapture={onSeek}
            data={route.params?.server_data}
            setChapCurrent={setTime}
            ref_chap={ref_chap}
            ref_time={ref_time}
          />
        )}
        <ModalChoiceChap
          modalVisible={modalChap}
          setModalVisible={setModalChap}
          setShowControl={setShowControl}
          setPlay={setPlay}
          onSlideCapture={onSeek}
          data={route.params?.server_data}
          chapCurrent={time['chap']}
          setChapCurrent={setTime}
          ref_chap={ref_chap}
          ref_time={ref_time}
        />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent:'center',
    // alignItems: 'center',
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
