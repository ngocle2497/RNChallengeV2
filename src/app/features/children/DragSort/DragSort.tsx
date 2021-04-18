import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text} from 'react-native';

const DragSortComponent = () => {
  return (
    <View>
      <Text />
    </View>
  );
};

export const DragSort = memo(DragSortComponent, isEqual);
