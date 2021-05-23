import {useMix, useSharedTransition} from '@animated';
import {Block} from '@components';
import React, {memo, useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
const WIDTH_BUTTON = 150;
const HEIGHT_BUTTON = 50;

const styles = StyleSheet.create({
  button: {
    width: WIDTH_BUTTON,
    height: HEIGHT_BUTTON,
    borderRadius: 10,
    position: 'absolute',
  },
  front: {
    backgroundColor: '#fd0006',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    backgroundColor: '#b4b4b4',
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
const Shadow = memo(({pressed}: {pressed: boolean}) => {
  // state
  const progress = useSharedTransition(pressed, {duration: 100});
  const translateY = useMix(progress, 5, 0);

  // reanimated style
  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  // render
  return <Animated.View style={[styles.button, styles.shadow, style]} />;
}, isEqual);

const Front = memo(
  ({children, pressed}: {pressed: boolean; children?: React.ReactElement}) => {
    // state
    const progress = useSharedTransition(pressed, {duration: 100});
    const translateY = useMix(progress, -10, 0);

    // reanimated style
    const style = useAnimatedStyle(() => ({
      transform: [{translateY: translateY.value}],
    }));

    // render
    return (
      <Animated.View style={[styles.button, styles.front, style]}>
        {children}
      </Animated.View>
    );
  },
  isEqual,
);

const Back = memo(() => {
  // render
  return (
    <LinearGradient
      colors={['#2d2c2c', '#d61217', '#d61217', '#2d2c2c']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.08, 0.92, 1]}
      style={[styles.button]}>
      <Animated.View />
    </LinearGradient>
  );
}, isEqual);

const Button3DComponent = () => {
  // state
  const [pressed, setPressed] = useState<boolean>(false);

  // function
  const onPressIn = useCallback(() => {
    setPressed(true);
  }, []);

  const onPressOut = useCallback(() => {
    setPressed(false);
  }, []);

  // render
  return (
    <Block block middle justifyContent={'center'}>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Block middle justifyContent={'center'}>
          <Shadow pressed={pressed} />
          <Back />
          <Front pressed={pressed}>
            <Text style={[styles.text]}>Push Me</Text>
          </Front>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

export const Button3D = memo(Button3DComponent, isEqual);
