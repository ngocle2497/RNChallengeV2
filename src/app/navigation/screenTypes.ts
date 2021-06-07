export enum APP_SCREEN {
  MAIN = 'MAIN',
  HOME = 'HOME',
  DRAG_SORT = 'DRAG_SORT',
  BUTTON_3D = 'BUTTON_3D',
  COUNTER = 'COUNTER',
  FLIP_CARD = 'FLIP_CARD',
  PHONE_INCOMING = 'PHONE_INCOMING',
}
export type HomeParamList = {
  [APP_SCREEN.DRAG_SORT]: undefined;
  [APP_SCREEN.BUTTON_3D]: undefined;
  [APP_SCREEN.COUNTER]: undefined;
  [APP_SCREEN.FLIP_CARD]: undefined;
  [APP_SCREEN.PHONE_INCOMING]: undefined;
};

export type RootStackParamList = Partial<HomeParamList>;
