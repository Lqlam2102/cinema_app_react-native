/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import {View, StyleSheet, Text, Modal, Alert, Pressable} from 'react-native';
import React from 'react';
import {getMinutesFromSeconds} from './ProgressBar';

const ModalWatching = ({
  modalVisible,
  setModalVisible,
  setShowControl,
  response,
  setPlay,
  onSlideCapture,
  data,
  setChapCurrent,
  ref_chap,
  ref_time,
}) => {
  let time_m = getMinutesFromSeconds(response?.time);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Thay đổi có thể chưa được lưu.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hệ thống phát hiện bạn đang xem ở phút {time_m} {data.length > 1 && (`Tập ${response?.chap + 1}`)}
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => {
                setPlay(true);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Xem lại từ đầu</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => {
                // setChapCurrent(response?.chap);
                setChapCurrent((pre)=>({...pre,time: response?.time, chap: response?.chap}));
                ref_chap.current = response?.chap;
                ref_time.current = response?.time;
                if (ref_chap.current === 0){
                  onSlideCapture({seekTime: response?.time});
                }
                setPlay(true);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Tiếp tục xem</Text>
            </Pressable>
            {/* <Pressable
              style={styles.buttonClose}
              onPress={() => {
                setShowControl(false)
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color:'white'}}>X</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    margin: 5,
    elevation: 2,
    width: 130,
  },
  buttonChoice: {
    backgroundColor: '#434242',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // buttonClose: {
  //   marginTop: 10,
  //   width: 100,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: "#ff474d",
  //   borderRadius: 10,
  //   padding: 5,
  //   elevation: 2,
  // },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalWatching;
