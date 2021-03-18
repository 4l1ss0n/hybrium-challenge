import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import Main from './pages/Main';
import Login from './pages/Login';

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false}}>
        <Screen name="Login" component={Login} />
        <Screen name="Main" component={Main} />
      </Navigator>
    </NavigationContainer>
  );
}