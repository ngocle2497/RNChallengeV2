import {StackView} from '@components';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {Text} from 'react-native';

const DragSortComponent = () => {
  return (
    <StackView>
      <Text>1</Text>
    </StackView>
  );
};

export const DragSort = memo(DragSortComponent, isEqual);
