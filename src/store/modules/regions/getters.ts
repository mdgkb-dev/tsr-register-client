import { GetterTree } from 'vuex';

import IRegion from '@/interfaces/IRegion';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IRegion[] | undefined {
    return state.items;
  },
  item(state): IRegion | undefined {
    return state.item;
  },
};

export default getters;
