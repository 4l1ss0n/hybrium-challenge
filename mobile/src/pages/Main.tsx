import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, Text, View } from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeDetails from '../components/TimeDetails';
import { RadioButton } from 'react-native-paper/';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Styles from '../styles/main';
import api from '../services/api';

interface UserTypes {
  id: string;
  name: string;
  email: string;
  tell: number;
  cpf: number;
  photo: string | null;
  ocupation: string;
  defaultTimeInExpedient : string;  
  defaultTimeOutExpedient : string;
  defaultTimeInLunch : string;
  defaultTimeOutLunch : string;  
  times: Array<{
    id: number,
    day: string;
    userId: string;
    timeInExpedient: string;
    timeOutExpedient: string | null;
    timeInLunch: string | null;
    timeOutLunch: string | null;
  }>
}

export default function Main() {
  const {navigate} = useNavigation();
  const [ user, setUser ] = useState<UserTypes>();
  const [ modalVisible, setModalVisible ] = useState<boolean>(true);
  const [checked, setChecked] = useState('1');

  async function handleExit() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    navigate('Login');
  }

  async function handleCreateUpdateTime(param: string) {
    if(!user) return
    const alrealyTimeExist = user.times[0];
    const todayNumber = new Date().getDate().toString();
    const timeDayNumber = user.times[0]?.day.split('T')[0].split('-')[2] || null;
    const gethourNow = `${new Date().getHours()}:${new Date().getMinutes()}`;
    const token = await AsyncStorage.getItem('token');

    if (timeDayNumber === todayNumber){
      if (!alrealyTimeExist.timeInLunch) {
        api.post('/times/update', {
          timeValue: param === '1'? user.defaultTimeInLunch: gethourNow,
          timeId: alrealyTimeExist.id
        }, {
          headers: {
            authorization: `Baerer ${token}`
          }
        }).then(res => {
          Alert.alert('Atualizado horario');
        }).catch(err => {
          Alert.alert('problemas com o server');
        })
        setModalVisible(!modalVisible);
        return
      }

      if (!alrealyTimeExist.timeOutLunch) {
        api.post('/times/update', {
          timeValue: param === '1'? user.defaultTimeOutLunch: gethourNow,
          timeId: alrealyTimeExist.id
        }, {
          headers: {
            authorization: `Baerer ${token}`
          }
        }).then(res => {
          Alert.alert('Atualizado horario');
        }).catch(err => {
          Alert.alert('problemas com o server');
        });
        setModalVisible(!modalVisible);
        return
      }
      api.post('/times/update', {
        timeValue: param === '1'? user.defaultTimeOutExpedient: gethourNow,
        timeId: alrealyTimeExist.id
      }, {
        headers: {
          authorization: `Baerer ${token}`
        }
      }).then(res => {
        Alert.alert('Atualizado horario');
      }).catch(err => {
        Alert.alert('problemas com o server');
      });
      setModalVisible(!modalVisible);
      return
    }
    api.post('/times/create', {
      timeValue: param === '1'? user.defaultTimeInExpedient: gethourNow,
    }, {
      headers: {
        authorization: `Baerer ${token}`
      }
    }).then(res => {
      Alert.alert('Cadastrado novo horario');
      getDatas();
    }).catch(err => {
      Alert.alert('problemas com o server');
    })
    setModalVisible(!modalVisible);
    return;
  }

  function getDatas() {
    AsyncStorage.getItem('id').then(id => {
      api.get(`/user/details?id=${id}`).then(res => {
        setUser(res.data);
      }).catch(err => {
        console.log('problemas ao buscar items');
      })
    }).catch(err => {
      console.log('problemas ao buscar id');
    })
  }

  useEffect(() => {
    getDatas();
  },[]);

  if (!user) {
    return <View/>
  }

  return (
    <View style={Styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.popupCreateTimeView}>
          <View style={Styles.popupView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={Styles.popupCloseButton}>
              <AntDesign name="closecircleo" size={20} color="#fff" />
            </Pressable>
            <View>
              <View style={Styles.popupOpnions}>
                <RadioButton
                  value="1"
                  status={ checked === '1' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('1')}
                />
                <Text style={Styles.popupOpnionText}>Usar horário padrão</Text>
              </View>
              <View style={Styles.popupOpnions}>
                <RadioButton
                  value="2"
                  status={ checked === '2' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('2')}
                />
                <Text style={Styles.popupOpnionText}>Usar horário atual</Text>
              </View>

            </View>

            <Pressable
              onPress={() => {handleCreateUpdateTime(checked)}}
              style={Styles.btnSubmit}
            >
              <Text style={Styles.btnSubmitText}>Enviar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={Styles.header}>
        <View style={Styles.imgAndName}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: user.photo || 'aa'}} style={Styles.image} />
            <Text style={Styles.name}>{ user.name }</Text>
          </View>
          <TouchableOpacity onPress={handleExit} style={{flexDirection: 'row', alignItems: 'center'}} >
            <Ionicons name="exit-outline" size={20} style={{marginRight: 5}} />
            <Text>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.ocupationAndDefaultTime}>
          <View>
            <Text style={Styles.companyTextBlue}>Ocupação</Text>
            <Text style={Styles.companyText}>{ user.ocupation }</Text>
          </View>
          <View>
            <Text style={Styles.companyTextBlue}>Horário Padrão</Text>
            <Text style={Styles.companyText}>{ `${user.defaultTimeInExpedient} ás ${user.defaultTimeOutExpedient}` }</Text>
          </View>
        </View>
        <View>
          <Text style={Styles.companyTextBlue}>Horário de almoço</Text>
          <Text style={Styles.companyText}>{ `${user.defaultTimeInLunch} ás ${user.defaultTimeOutLunch}` }</Text>
        </View>
      </View>
      <RectButton onPress={() => setModalVisible(!modalVisible) } style={Styles.markTime}>
        <Text style={Styles.markTimeText}>Marcar entrada/saída</Text>
      </RectButton>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {
          user.times.map(time => (
            <TimeDetails key={time.id} content={time}/>
          ))
        }
      </ScrollView>
    </View>
  );
};