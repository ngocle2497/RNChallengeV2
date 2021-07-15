import {sharedTiming, useInterpolate, useRadian} from '@animated';
import {Block, TouchableScale} from '@components';
import React, {memo, useCallback} from 'react';
import isEqual from 'react-fast-compare';
import {Platform, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE_BUTTON = 60;
const SIZE_WHEEL = 90;

const R1 = SIZE_WHEEL / 3;
const R2 = SIZE_WHEEL / 5;
const CENTER = SIZE_WHEEL / 2;

const styles = StyleSheet.create({
  wheel: {
    width: SIZE_WHEEL,
    height: SIZE_WHEEL,
    borderRadius: SIZE_WHEEL / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1e90ff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
  },
});

const JogWheelComponent = () => {
  // state
  const progress = useSharedValue(0);
  const rotate = useRadian(
    useInterpolate(progress, [0, 80], [0, 720], Extrapolate.CLAMP),
  );
  const shadowRadius = useInterpolate(progress, [0, 10], [0, 15]);
  const elevation = useInterpolate(progress, [0, 10], [1, 15]);
  const scale = useSharedValue(1);
  const stroke = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 20], ['#000', '#00cec9']),
  );

  // function
  const onPressIn = useCallback(() => {
    scale.value = sharedTiming(1.6);
    progress.value = sharedTiming(
      progress.value + Math.floor(Math.random() * 10 + 10),
      {duration: 200},
    );
  }, [progress, scale]);

  const onPressOut = useCallback(() => {
    scale.value = sharedTiming(1);
    progress.value = withDelay(0, sharedTiming(0, {duration: 400}));
  }, [progress, scale]);

  // reanimated props
  const circle1 = useAnimatedProps(() => ({
    stroke: stroke.value,
  }));

  const circle2 = useAnimatedProps(() => ({
    stroke: stroke.value,
  }));

  // reanimated style
  const jogStyle = useAnimatedStyle(() => ({
    transform: [{rotate: rotate.value}, {scale: scale.value}],
    shadowRadius: shadowRadius.value,
    elevation: elevation.value,
  }));

  // render
  return (
    <Block block color={Platform.OS === 'android' ? '#FFFFFF' : 'black'}>
      <Block block middle justifyContent={'center'}>
        <Animated.View style={[styles.wheel, jogStyle]}>
          <Svg>
            <AnimatedCircle
              strokeWidth={3}
              strokeDashoffset={Math.PI * 2 * R1}
              strokeDasharray={(Math.PI * 2 * R1) / 4}
              r={R1}
              cx={CENTER}
              cy={CENTER}
              animatedProps={circle1}
            />
            <AnimatedCircle
              strokeWidth={3}
              strokeDashoffset={Math.PI * 2 * R2}
              strokeDasharray={(Math.PI * 2 * R2) / 4}
              r={R2}
              cx={CENTER}
              cy={CENTER}
              animatedProps={circle2}
            />
          </Svg>
        </Animated.View>
      </Block>
      <Block block justifyContent={'center'}>
        <TouchableScale
          minScale={0.85}
          onPressOut={onPressOut}
          onPressIn={onPressIn}>
          <Block
            width={SIZE_BUTTON}
            height={SIZE_BUTTON}
            borderRadius={SIZE_BUTTON / 2}
            color={'#e74c3c'}
          />
        </TouchableScale>
      </Block>
    </Block>
  );
};

export const JogWheel = memo(JogWheelComponent, isEqual);
