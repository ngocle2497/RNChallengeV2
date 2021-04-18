import {Block} from '@components';
import {APP_COLOR} from '@config';
import React, {memo, useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {StatusBar, StyleSheet} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ITEM_HEIGHT, listToObject, shuffle, staticData} from './constants';
import {ItemView} from './ItemView';
import {ItemType} from './type';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: APP_COLOR,
  },
  list: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
});

const DragSortComponent = () => {
  // state
  const [data] = useState<Array<ItemType>>(shuffle(staticData));
  const positions = useSharedValue(listToObject(data));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  // function
  const renderItem = useCallback(
    (item: ItemType) => {
      return (
        <ItemView
          key={item.id}
          item={item}
          listSize={data.length}
          scrollY={scrollY}
          positions={positions}
          id={item.id}
        />
      );
    },
    [data.length, positions, scrollY],
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  useAnimatedReaction(
    () => scrollY.value,
    scrolling => scrollTo(scrollViewRef, 0, scrolling, false),
  );
  useAnimatedReaction(
    () => positions.value,
    result => {
      console.log(result);
    },
  );

  // render
  return (
    <SafeAreaView style={[styles.root]}>
      <StatusBar backgroundColor={APP_COLOR} barStyle={'light-content'} />
      <Block color={'#FFFFFF'} block>
        <Animated.ScrollView
          ref={scrollViewRef}
          style={[styles.list]}
          contentContainerStyle={{height: ITEM_HEIGHT * data.length}}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          {data.map(renderItem)}
        </Animated.ScrollView>
      </Block>
    </SafeAreaView>
  );
};

export const DragSort = memo(DragSortComponent, isEqual);
