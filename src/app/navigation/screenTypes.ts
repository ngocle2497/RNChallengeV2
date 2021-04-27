export enum APP_SCREEN {
  MAIN = 'MAIN',
  HOME = 'HOME',
  DRAG_SORT = 'DRAG_SORT',
}
export type HomeParamList = {
  [APP_SCREEN.DRAG_SORT]: {id: number};
};

export type RootStackParamList = Partial<HomeParamList>;
