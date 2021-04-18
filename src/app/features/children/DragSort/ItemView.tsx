import {sharedClamp, sharedSpring, sharedTiming} from '@animated';
import {ImageRemote} from '@components';
import React, {memo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ITEM_HEIGHT, objectMove} from './constants';
import {ItemType} from './type';

const SCROLL_HEIGHT_THRESHOLD = ITEM_HEIGHT;
const styles = StyleSheet.create({
  wrap: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 5,
  },
  img: {
    width: ITEM_HEIGHT - 10,
    height: ITEM_HEIGHT - 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
  },
  description: {
    fontSize: 11,
    flex: 2,
  },
  wrapContent: {
    flex: 1,
    paddingLeft: 10,
  },
});
interface ItemViewProps {
  item: ItemType;
  id: string;
  positions: Animated.SharedValue<any>;
  scrollY: Animated.SharedValue<number>;
  listSize: number;
}

const ItemViewComponent = ({
  id,
  item,
  scrollY,
  listSize,
  positions,
}: ItemViewProps) => {
  // state
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  // function
  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * ITEM_HEIGHT);
        }
      }
    },
    [moving],
  );
  const onGestureEvent = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;

      if (positionY <= scrollY.value + SCROLL_HEIGHT_THRESHOLD) {
        // Scroll up
        scrollY.value = sharedTiming(0, {duration: 1500});
      } else if (
        positionY >=
        scrollY.value + dimensions.height - SCROLL_HEIGHT_THRESHOLD
      ) {
        // Scroll down
        const contentHeight = listSize * ITEM_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = sharedTiming(maxScroll, {duration: 1500});
      } else {
        cancelAnimation(scrollY);
      }

      top.value = sharedTiming(positionY - ITEM_HEIGHT, {
        duration: 16,
      });

      const newPosition = sharedClamp(
        Math.floor(positionY / ITEM_HEIGHT),
        0,
        listSize - 1,
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = sharedSpring(positions.value[id] * ITEM_HEIGHT);
      runOnJS(setMoving)(false);
    },
  });

  // reanimated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 3 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={[styles.wrap, animatedStyle]}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.img]}>
          <ImageRemote source={item.img} />
        </Animated.View>
      </PanGestureHandler>
      <View style={[styles.wrapContent]}>
        <Text style={[styles.title]}>{item.name ?? ''}</Text>
        <Text style={[styles.description]} numberOfLines={2}>
          {item.description ?? ''}
        </Text>
      </View>
    </Animated.View>
  );
};

export const ItemView = memo(ItemViewComponent, isEqual);
