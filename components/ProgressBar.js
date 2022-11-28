/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */

import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';

const getMinutesFromSeconds = time => {
  const minutes = time >= 60 ? Math.floor(time / 60) : 0;
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
  }`;
};

const ProgressBar = props => {
  const {currentTime, duration, onSlideCapture, onSlideStart, onSlideComplete} =
    props;
  const { height, width } = useWindowDimensions();

  const [showTime, setShowTime] = useState(false);
  const [timeShow, setTimeShow] = useState(0);
  const [positionTime, setPositionTime] = useState(0);
  const [widthSlider, setWidthSlider] = useState(0);
  let position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  const handleOnCompleteSlide = time => {
    onSlideCapture({seekTime: time});
    onSlideComplete();
    setShowTime(false);
  };
  const handleOnStartSlide = time => {
    onSlideStart();
    setShowTime(true);
  };
  const handleOnSlide = time => {
    setTimeShow(getMinutesFromSeconds(time));
    setPositionTime(time);
  };

  return (
    <>
     {showTime && duration > 0 && (
          <Text
            style={{
              position: 'absolute',
              left: ((widthSlider - 45) * positionTime) / duration,
              fontSize: 13,
              color: '#FFFFFF',
              paddingLeft: 10,
              bottom: 100,
            }}>
            {timeShow}
          </Text>
      )}
      <View style={styles.wrapper}>
        <Slider
          style={{flex: 7}}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          step={1}
          hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
          onValueChange={handleOnSlide}
          onSlidingStart={handleOnStartSlide}
          onSlidingComplete={handleOnCompleteSlide}
          minimumTrackTintColor={'#F44336'}
          maximumTrackTintColor={'#FFFFFF'}
          thumbTintColor={'#F44336'}
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setWidthSlider(width);
          }}
        />
        <Text
          style={styles.timeRight}>
          {fullDuration}
        </Text>
        {/* <View style={styles.timeWrapper}>
        <Text style={styles.timeLeft}>{position}</Text>
        <Text style={styles.timeRight}>{fullDuration}</Text>
      </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -15,
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  timeLeft: {
    position: 'absolute',
    left: 30,
    fontSize: 13,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
  timeRight: {
    // flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingRight: 10,
  },
});

export {getMinutesFromSeconds};
export default ProgressBar;