import {Block, Icon} from '@components';
import React, {memo, useCallback, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 150;
const DELAY = 500;
const timingConfig: Animated.WithTimingConfig = {
  duration: 2500,
  easing: Easing.inOut(Easing.ease),
};

const styles = StyleSheet.create({
  phone: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EE19F2',
  },
  ripple: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#FC63FF',
    position: 'absolute',
  },
});

const Ripple = memo(({index}: {index: number}) => {
  // state
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  // effect
  useEffect(() => {
    scale.value = withDelay(
      index * DELAY,
      withRepeat(withTiming(3, timingConfig), -1),
    );
    opacity.value = withDelay(
      index * DELAY,
      withRepeat(withTiming(0, timingConfig), -1),
    );
  }, []);

  // reanimated style
  const style = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    }),
    [],
  );

  // render
  return <Animated.View style={[styles.ripple, style]} />;
}, isEqual);

const PhoneIncomingComponent = () => {
  // function
  const renderItem = useCallback((item: number) => {
    return <Ripple index={item} key={item} />;
  }, []);
  // render
  return (
    <Block block middle justifyContent={'center'}>
      <Block width={SIZE} height={SIZE}>
        {Array(5)
          .fill(0)
          .map((_, i) => i)
          .map(renderItem)}
        <Block style={[styles.phone]}>
          <Icon icon={'phone_incoming'} size={40} />
        </Block>
      </Block>
    </Block>
  );
};

export const PhoneIncoming = memo(PhoneIncomingComponent, isEqual);
