import {APP_COLOR} from '@config';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {MainScreen} from './MainScreen';
import {navigationRef} from './navigationService';

export const AppContainer = () => {
  // effect
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // render
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={APP_COLOR} barStyle={'light-content'} />
      <MainScreen />
    </NavigationContainer>
  );
};
