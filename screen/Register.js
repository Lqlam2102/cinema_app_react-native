/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import styled from 'styled-components/native';
import {images} from '../constants';
import Apis, {endpoints} from '../config/Apis';

// import Header from "../components/Header";

const Register = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [loading, setLoading] = useState(false);
  var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  const register = async () => {
    setLoading(true);
    if (!email || !password || !firstName || !lastName) {
      alert('Không được để trống thông tin');
      setLoading(false);
      return;
    }
    else if (email.match(format)){
      alert('Tên đăng nhập không được phép chứa ký tự đặc biệt');
      setLoading(false);
      return;
    }
    else if(email.length <= 6 ){
      alert('Tên đăng nhập phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }
    else if(password.length <= 6 ){
      alert('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }
     else if (password !== passwordAgain) {
      alert('Mật khẩu nhập lại chưa chính xác');
      setPasswordAgain('');
      setLoading(false);
      return;
    } else {
      return fetch('http://192.168.0.102:8000/users/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: email,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (
            json['username'] == 'A user with that username already exists.'
          ) {
            alert('Tên đăng nhập đã tồn tại.');
          } else {
            navigation.navigate('Login');
            alert('Đăng ký thành công.');
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          alert('Đăng ký thất bại');
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Container>
        <ImageBackground
          source={{
            uri: images.background,
          }}
          resizeMode="cover"
          style={{flex: 1, height: Dimensions.get('window').height}}>
          <Overlay>
            {/* <Header login={false} /> */}
            <FormWrapper>
              <Form>
                <KeyboardAvoidingView style={{width: '100%'}}>
                  <SignInText>Đăng ký</SignInText>
                  <InputsWrapper>
                    <HalfInputWrapper>
                      <HalfInput
                        placeholderTextColor="grey"
                        placeholder="Họ tên đệm"
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                      />
                      <HalfInput
                        placeholderTextColor="grey"
                        placeholder="Tên"
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                      />
                    </HalfInputWrapper>
                    <Input
                      placeholderTextColor="grey"
                      placeholder="Tên tài khoản"
                      value={email}
                      onChangeText={text => setEmail(text)}
                    />
                    <Input
                      placeholderTextColor="grey"
                      placeholder="Mật khẩu"
                      value={password}
                      secureTextEntry
                      onChangeText={text => setPassword(text)}
                    />
                    <Input
                      placeholderTextColor="grey"
                      placeholder="Nhập lại mật khẩu"
                      value={passwordAgain}
                      secureTextEntry
                      onChangeText={text => setPasswordAgain(text)}
                    />
                    <SubmitForm onPress={register} disabled={loading}>
                      <ButtonText>
                        {loading ? 'Loading...' : 'Đăng ký'}
                      </ButtonText>
                    </SubmitForm>
                    <NewToNetflixTextWrapper
                      activeOpacity={0.5}
                      onPress={() => navigation.navigate('Login')}>
                      <NewToNetflix>
                        Đã có tài khoản? Đăng nhập ngay
                      </NewToNetflix>
                    </NewToNetflixTextWrapper>
                  </InputsWrapper>
                </KeyboardAvoidingView>
              </Form>
            </FormWrapper>
          </Overlay>
        </ImageBackground>
      </Container>
    </>
  );
};
const Container = styled.ScrollView`
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

const HalfInputWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HalfInput = styled.TextInput`
  width: 45.8%;
  height: 50px;
  border: none;
  padding: 10px;
  border-radius: 15px;
  background-color: #333333;
  color: white;
  margin-right: 5px;
  margin-top: 10px;
  &:focus {
    background-color: #454545;
  }
`;

const InputsWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default Register;
