import { MutationTree } from 'vuex';

import MkbGroup from '@/classes/mkb/MkbGroup';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMkbGroup[]) {
    state.items = items.map((i: IMkbGroup) => new MkbGroup(i));
  },
  set(state, item: IMkbGroup) {
    state.item = new MkbGroup(item);
  },
};

export default mutations;
