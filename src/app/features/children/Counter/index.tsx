import {Block} from '@components';
import React, {memo, useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Text, TouchableOpacity} from 'react-native';

import {HEIGHT_NUMBER} from './constant';
import {CounterItem} from './CounterItem';

const CounterComponent = () => {
  // state
  const [counter, setCounter] = useState<number>(0);

  // function
  const onIncrement = useCallback(() => {
    setCounter(v => v + 1);
  }, []);

  const onDecrement = useCallback(() => {
    if (counter > 0) {
      setCounter(v => v - 1);
    }
  }, [counter]);

  const renderItem = useCallback((item: string, index: number) => {
    return <CounterItem key={index} item={item} />;
  }, []);

  // render
  return (
    <Block block middle>
      <Block block middle justifyContent={'center'}>
        <Block height={HEIGHT_NUMBER} direction={'row'}>
          {counter.toString().split('').map(renderItem)}
        </Block>
      </Block>
      <Block block>
        <TouchableOpacity onPress={onIncrement}>
          <Text>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDecrement}>
          <Text>Decrement</Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export const Counter = memo(CounterComponent, isEqual);
