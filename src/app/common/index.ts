import {StyleSheet} from 'react-native';
export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};
type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
