import {APP_COLOR} from '@config';
import {Button3D} from '@features/children/Button3D';
import {DragSort} from '@features/children/DragSort/DragSort';
import {Home} from '@features/home/Home';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Block} from '../library/components/Block/Block';
import {Icon} from '../library/components/Icon/Icon';
import {Text} from '../library/components/Text/Text';

import {APP_SCREEN} from './screenTypes';

const MainStack = createStackNavigator();

export const MainScreen = () => {
  // state
  const [t] = useTranslation();
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: APP_COLOR,
      },
      headerTitleAlign: 'center',
      headerTintColor: '#1E6575',
      headerLeft: ({canGoBack, onPress}) => {
        return (
          canGoBack && (
            <TouchableOpacity onPress={onPress}>
              <Block direction={'row'} middle paddingHorizontal={5}>
                <Icon icon={'back_ios'} color={'#ffffff'} />
                <Text fontSize={16} color={'#ffffff'}>
                  Back
                </Text>
              </Block>
            </TouchableOpacity>
          )
        );
      },
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
      headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
    }),
    [],
  );

  // render
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        component={Home}
        name={APP_SCREEN.HOME}
        options={{title: 'RNChallenge v2'}}
      />
      <MainStack.Screen
        component={DragSort}
        name={APP_SCREEN.DRAG_SORT}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        component={Button3D}
        name={APP_SCREEN.BUTTON_3D}
        options={{title: t('3dButton:txHeader')}}
      />
    </MainStack.Navigator>
  );
};
