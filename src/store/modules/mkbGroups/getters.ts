import { GetterTree } from 'vuex';

import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMkbGroup[] {
    return state.items;
  },
  item(state): IMkbGroup {
    return state.item;
  },
};

export default getters;
