import React, {Suspense} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';

import I18n from './src/app/library/utils/i18n/i18n';
import {AppContainer} from './src/app/navigation/AppNavigation';

export const MyApp = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={I18n}>
        <Suspense fallback={<View />}>
          <AppContainer />
        </Suspense>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};
