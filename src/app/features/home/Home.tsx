import {StackView} from '@components';
import {APP_SCREEN} from '@navigation/screenTypes';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

import {RowButton} from './components/RowButton';

const HomeComponent = () => {
  return (
    <StackView>
      <RowButton screenName={APP_SCREEN.DRAG_SORT} txTitle={'main:dragSort'} />
      <RowButton screenName={APP_SCREEN.BUTTON_3D} txTitle={'main:3dButton'} />
      <RowButton screenName={APP_SCREEN.COUNTER} txTitle={'main:counter'} />
    </StackView>
  );
};

export const Home = memo(HomeComponent, isEqual);
