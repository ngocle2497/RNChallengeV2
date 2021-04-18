import {onCheckType} from '@common';
import {Block, Divider, Icon, Text, TouchableScale} from '@components';
import {navigate} from '@navigation/navigationService';
import {APP_SCREEN} from '@navigation/screenTypes';
import React, {memo, useCallback} from 'react';
import isEqual from 'react-fast-compare';

interface RowButtonProps {
  txTitle: string;
  screenName: Exclude<APP_SCREEN, APP_SCREEN.MAIN>;
}

const RowButtonComponent = ({txTitle, screenName}: RowButtonProps) => {
  // function
  const onPress = useCallback(() => {
    if (screenName && onCheckType(screenName, 'string')) {
      navigate(screenName);
    }
  }, [screenName]);
  // render
  return (
    <Block>
      <TouchableScale onPress={onPress} minScale={0.97}>
        <Block padding={10} direction={'row'} middle>
          <Block block>
            <Text tx={txTitle} />
          </Block>
          <Icon icon={'arrow_right'} />
        </Block>
      </TouchableScale>
      <Divider />
    </Block>
  );
};

export const RowButton = memo(RowButtonComponent, isEqual);
