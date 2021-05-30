import {
  sharedTiming,
  useInterpolate,
  useRadian,
  useSharedTransition,
} from '@animated';
import {Block} from '@components';
import React, {memo, useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const IMAGE_SIZE = 190;
const styles = StyleSheet.create({
  front: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#474787',
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#34ace0',
    padding: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  button: {
    marginTop: 30,
    padding: 5,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 10,
  },
  buttonCall: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 5,
  },
  textButton: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonHelp: {
    position: 'absolute',
    alignSelf: 'center',
    top: 5,
  },
});

const FlipCardComponent = () => {
  // state
  const [isFront, setIsFront] = useState<boolean>(true);
  const progress = useSharedTransition(!isFront, {duration: 1000});
  const rotateYFront = useInterpolate(progress, [0, 1], [0, 180]);
  const opacityFrontShadow = useInterpolate(progress, [0, 1], [0, 0.5]);
  const opacityBackShadow = useInterpolate(progress, [0, 1], [0.5, 0]);
  const rotateYBack = useInterpolate(progress, [0, 1], [-180, 0]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useRadian(
    useInterpolate(translateX, [-50, 50], [-3, 3], Extrapolate.CLAMP),
  );

  // function
  const onToggle = useCallback(() => {
    setIsFront(v => !v);
  }, []);

  const onCall = useCallback(() => {
    Alert.alert('', 'Call me?');
  }, []);

  const onHelp = useCallback(() => {
    Alert.alert('', 'Help me?');
  }, []);

  const onGesture = useAnimatedGestureHandler({
    onActive: event => {
      const {translationX, translationY} = event;
      translateX.value = translationX;
      translateY.value = translationY;
    },
    onFinish: () => {
      translateX.value = sharedTiming(0);
      translateY.value = sharedTiming(0);
    },
  });

  // reanimated style
  const frontStyle = useAnimatedStyle(
    () => ({
      transform: [
        {perspective: (progress.value + 1) * 180},
        {rotateY: `${rotateYFront.value}deg`},
      ],
      opacity: progress.value >= 0.5 ? 0 : 1,
      zIndex: progress.value >= 0.5 ? 0 : 1,
    }),
    [],
  );
  const frontShadowStyle = useAnimatedStyle(() => ({
    opacity: opacityFrontShadow.value,
  }));

  const backShadowStyle = useAnimatedStyle(() => ({
    opacity: opacityBackShadow.value,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: (progress.value + 1) * 180},
      {rotateY: `${rotateYBack.value}deg`},
    ],
    opacity: progress.value >= 0.5 ? 1 : 0,
    zIndex: progress.value >= 0.5 ? 1 : 0,
  }));

  const wrapStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {rotateZ: rotateZ.value},
    ],
  }));

  // render
  return (
    <Block block middle justifyContent={'center'}>
      <PanGestureHandler onGestureEvent={onGesture}>
        <Animated.View style={[wrapStyle]}>
          <Animated.View style={[styles.back, backStyle]}>
            <Animated.View
              style={[styles.shadow, backShadowStyle]}
              pointerEvents={'none'}
            />
            <TouchableOpacity style={[styles.buttonHelp]} onPress={onHelp}>
              <Text style={[styles.textButton]}>Help Me</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.front, frontStyle]}>
            <Animated.View
              style={[styles.shadow, frontShadowStyle]}
              pointerEvents={'none'}
            />
            <FastImage
              style={[styles.image]}
              source={require('./images/avatar.jpeg')}
            />
            <TouchableOpacity style={[styles.buttonCall]} onPress={onCall}>
              <Text style={[styles.textButton]}>Call Me</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <TouchableOpacity style={[styles.button]} onPress={onToggle}>
        <Text>Flip</Text>
      </TouchableOpacity>
    </Block>
  );
};

export const FlipCard = memo(FlipCardComponent, isEqual);
