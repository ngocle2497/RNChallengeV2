/* eslint-disable max-len */
import faker from 'faker';

import {ItemType} from './type';
export const ITEM_HEIGHT = 70;
export function shuffle(array: Array<any>) {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
export function listToObject(list: Array<any>) {
  const values = Object.values(list);
  const object = {} as any;

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }

  return object;
}

export const objectMove = (object: any, from: number, to: number) => {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
};
export const staticData: Array<ItemType> = [
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1580319204908-eff9d6f0bd68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1510589751317-000ce48678ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1540015605283-b24e303c7f6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1557839486-69e60c8416b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1616860218898-c74499ae6b21?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1614983264284-bb3d23e1209e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1612781367540-433dff529376?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1618020211044-6968333281f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1518767485027-85f01a69b8a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1618215665030-b10900e0f602?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1617823494459-88dadcb77f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1617051571090-85766fa13621?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1553545204-4f7d339aa06a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=984&q=80',
  },
  {
    id: faker.datatype.uuid(),
    year: faker.datatype.datetime().getFullYear(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.product(),
    img:
      'https://images.unsplash.com/photo-1617689199900-07687373c76a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
  },
];
