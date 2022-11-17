/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Dimensions, ImageBackground, StatusBar} from 'react-native';
import styled from 'styled-components/native';


import Apis, {endpoints} from '../config/Apis';
import {images} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setLoading(true);
    if (!username || !password) {
      alert('All fields are mandatory');
      setPassword('');
      setUsername('');
      setLoading(false);
      return;
    } else {
      try {
        let info = await Apis.get(endpoints['oauth2-info']);
        let res = await Apis.post(endpoints['login'], {
          client_id: info.data.client_id,
          client_secret: info.data.client_secret,
          username: username,
          password: password,
          grant_type: 'password',
        });

        // await AsyncStorage.setItem('@access_token', res.data.access_token);
        // const access_token = await AsyncStorage.getItem('@access_token');
        // let user = await Apis.get(endpoints['current-user'], {
        //   headers: {
        //     Authorization: `Bearer ${access_token}`,
        //   },
        // });
        // await AsyncStorage.setItem('@user', res.data.access_token);
        setLoading(false);
        navigation.replace('UITab');
      } catch (err) {
        console.log(err.message);
        if (err.message === 'Network Error') {
          alert('Có lỗi xảy ra, vui lòng thử lại sau.');
        } else {
          alert('Tài khoản hoặc mật khẩu không chính xác.');
        }
        setLoading(false);
      }
    }
  };
  return (
    <>
      <StatusBar style="light" />
      <ContainerView>
        <ImageBackground
          source={{
            uri: images.background,
          }}
          resizeMode="cover"
          style={{flex: 1, height: Dimensions.get('window').height}}>
          <Overlay>
            <FormWrapper>
              <Form>
                <SignInText>Đăng nhập</SignInText>
                <Input
                  placeholder="Tên đăng nhập"
                  placeholderTextColor="grey"
                  value={username}
                  onChangeText={text => setUsername(text)}
                />
                <Input
                  placeholder="Mật khẩu"
                  placeholderTextColor="grey"
                  secureTextEntry
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <SubmitForm onPress={login} disabled={loading}>
                  <ButtonText>{loading ? 'Loading...' : 'Đăng nhập'}</ButtonText>
                </SubmitForm>
                <NewToNetflixTextWrapper
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('Register')}>
                  <NewToNetflix>Chưa có tài khoản? Đăng ký ngay</NewToNetflix>
                </NewToNetflixTextWrapper>
              </Form>
            </FormWrapper>
          </Overlay>
        </ImageBackground>
      </ContainerView>
    </>
  );
};
const ContainerView = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const FormWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const Form = styled.View`
  height: 400px;
  width: 90%;
  background-color: black;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  justify-content: center;
`;

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: #E7442E;
`;

const Input = styled.TextInput`
  width: 95%;
  height: 50px;
  border: none;
  padding: 10px;
  border-radius: 15px;
  background-color: #333333;
  color: white;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
  color: white;
`;
const SignInText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: left;
`;

const NewToNetflixTextWrapper = styled.TouchableOpacity`
  width: 100%;
`;

const NewToNetflix = styled.Text`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  color: #ccc;
  margin: 15px;
  text-align: center;
`;

const Overlay = styled.View`
  background-color: 'rgba(0,0,0,0.5)';
  flex: 1;
`;
export default Login;
