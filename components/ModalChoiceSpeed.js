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
} from 'react-native';
import React from 'react'

const ModalChoiceSpeed = ({modalVisible,setModalVisible, speed, setSpeed, setShowControl}) => {
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
            <Text style={styles.modalText}>Chọn tốc độ phát</Text>
            <Pressable
              style={[styles.button, speed === 0.5 ? styles.buttonChoice : null]}
              onPress={() => {
                setSpeed(0.5);
                setShowControl(false)
                setModalVisible(!modalVisible);
                }}>
              <Text style={styles.textStyle}>0,5x</Text>
            </Pressable>
            <Pressable
              style={[styles.button, speed === 0.75 ? styles.buttonChoice : null]}
              onPress={() => {
                setSpeed(0.75);
                setShowControl(false)
                setModalVisible(!modalVisible);
                }}>
              <Text style={styles.textStyle}>0,75x</Text>
            </Pressable>
            <Pressable
              style={[styles.button, speed === 1 ? styles.buttonChoice : null]}
              onPress={() => {
                setSpeed(1);
                setShowControl(false)
                setModalVisible(!modalVisible);
                }}>
              <Text style={styles.textStyle}>1x (Bình thường)</Text>
            </Pressable>
            <Pressable
              style={[styles.button, speed === 1.5 ? styles.buttonChoice : null]}
              onPress={() => {
                setSpeed(1.5);
                setShowControl(false)
                setModalVisible(!modalVisible);
                }}>
              <Text style={styles.textStyle}>1,5x</Text>
            </Pressable>
            <Pressable
              style={[styles.button, speed === 2 ? styles.buttonChoice : null]}
              onPress={() => {
                setSpeed(2);
                setShowControl(false)
                setModalVisible(!modalVisible);
                }}>
              <Text style={styles.textStyle}>2x</Text>
            </Pressable>
          </View>
        </View>
        <View>
        <Pressable
              style={styles.buttonClose}
              onPress={() => {
                setShowControl(false)
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color:'white'}}>X</Text>
            </Pressable>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: "30%",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: "#434242",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    position: 'relative',
    top:-162,
    left:200,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height:50,
    backgroundColor: "#ff474d",
    borderRadius: 50,
    padding: 5,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalChoiceSpeed;