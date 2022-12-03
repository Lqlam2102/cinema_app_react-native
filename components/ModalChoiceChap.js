/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eol-last */
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';

const ModalChoiceChap = ({
  modalVisible,
  setModalVisible,
  setShowControl,
  chapCurrent,
  setPlay,
  onSlideCapture,
  data,
  setChapCurrent,
  ref_chap,
}) => {
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
          <Text style={styles.modalText}>Chọn tập</Text>
          <View style={styles.modalView}>
            <ScrollView horizontal style={{width: 250}}>
              <View style={{ width: '100%', height: 230, flexWrap: 'wrap' }}>
              {data.map((chap, index) => {
                return (
                  <Pressable
                    key={index}
                    style={[styles.button, index === chapCurrent ? styles.buttonChoice : null]}
                    onPress={() => {
                      // setChapCurrent(index);
                      setChapCurrent((pre)=>({...pre,chap: index}));
                      setPlay(true);
                      ref_chap.current = index;
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Tập {chap.name}</Text>
                  </Pressable>
                );
              })}
              </View>
            </ScrollView>
          </View>
        </View>
        <View>
          <Pressable
            style={styles.buttonClose}
            onPress={() => {
              setShowControl(false);
              setModalVisible(!modalVisible);
            }}>
            <Text style={{color: 'white'}}>X</Text>
          </Pressable>
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
    paddingVertical: 50,
    paddingHorizontal: 30,
    shadowColor: '#000',
    width: 300,
    height: 300,
    maxHeight: 300,
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
    width: 100,
  },
  buttonChoice: {
    backgroundColor: '#434242',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    position: 'relative',
    top: -300,
    left: 540,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#ff474d',
    borderRadius: 50,
    padding: 5,
    elevation: 2,
  },
  modalText: {
    top: 55,
    zIndex: 20,
    textAlign: 'center',
  },
});

export default ModalChoiceChap;
