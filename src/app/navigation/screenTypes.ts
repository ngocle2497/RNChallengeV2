export enum APP_SCREEN {
  MAIN = 'MAIN',
  HOME = 'HOME',
  DRAG_SORT = 'DRAG_SORT',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.DRAG_SORT]: undefined;
};
