import {sharedTiming} from '@animated';
import {Block} from '@components';
import React, {memo, useCallback, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {HEIGHT_NUMBER} from './constant';

const ArrayNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface CounterItemProps {
  item: string;
}

const CounterItemComponent = ({item}: CounterItemProps) => {
  // state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateY = useDerivedValue(() =>
    sharedTiming(currentIndex * -HEIGHT_NUMBER),
  );
  // function
  const renderItem = useCallback((i: number) => {
    return (
      <Block height={HEIGHT_NUMBER} justifyContent={'center'}>
        <Text>{i}</Text>
      </Block>
    );
  }, []);

  // reanimated style
  const style = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  // effect
  useEffect(() => {
    const nextIndex = ArrayNumber.findIndex(x => x.toString() === item);
    setCurrentIndex(nextIndex);
  }, [item]);

  // render
  return (
    <Block
      height={HEIGHT_NUMBER}
      overflow={'hidden'}
      paddingHorizontal={5}
      middle>
      <Animated.View style={style}>{ArrayNumber.map(renderItem)}</Animated.View>
    </Block>
  );
};

export const CounterItem = memo(CounterItemComponent, isEqual);
