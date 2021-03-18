import React, { useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { RectButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Styles from '../styles/login';
import background from '../assets/background-image.jpeg';
import api from '../services/api';

export default function Login() {
  const {navigate} = useNavigation();
  const [visible, setVisible] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleSubmit() {
    api.get('/login', {
      auth: {
        username: email,
        password
      }
    }).then(async (res) => {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('id', res.data.id);
      navigate('Main');
    }).catch(err => {
      console.log('Problemas os fazer login', err);
    })
  }
  
  return (
    <ImageBackground source={background} blurRadius={1} style={Styles.container}>
      <View style={Styles.loginView}>
        <View style={Styles.header}>
          <Text style={Styles.title}>Bata o seu ponto</Text>
          <Text style={Styles.subTitle}>de forma fácil e prática</Text>
        </View>
        <View style={Styles.form}>
          <TextInput
            style={Styles.input}
            placeholder="Digite o seu email"
            keyboardType='email-address'
            autoCompleteType="off"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor='#000'
          />
          <View style={Styles.passwordView}>
            <TextInput
              style={Styles.input}
              placeholder="Digite a sua senha"
              keyboardType="web-search"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={visible}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor='#000'
            />
            <RectButton style={Styles.showPassword} onPress={() => {setVisible(!visible)}}>
              {
                visible ?
                <Feather name="eye-off" size={26} color="#999" /> :
                <Feather name="eye" size={26} color="#999" />
              }
            </RectButton>
            <Text style={Styles.pswForgot}>Esqueci minha senha</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSubmit} style={Styles.btn}>
          <Text style={Styles.btnText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};