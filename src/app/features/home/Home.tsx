import {StackView} from '@components';
import {APP_SCREEN} from '@navigation/screenTypes';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';

import {RowButton} from './components/RowButton';

const HomeComponent = () => {
  return (
    <StackView>
      <RowButton screenName={APP_SCREEN.DRAG_SORT} txTitle={'main:dragSort'} />
    </StackView>
  );
};

export const Home = memo(HomeComponent, isEqual);
