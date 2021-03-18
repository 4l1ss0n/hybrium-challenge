import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';


const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Routes />
    </>
  );
};

export default App;