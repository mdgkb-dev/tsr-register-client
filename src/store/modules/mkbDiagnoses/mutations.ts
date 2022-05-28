import { MutationTree } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMkbDiagnosis[]) {
    state.items = items.map((i: IMkbDiagnosis) => new MkbDiagnosis(i));
  },
  set(state, item: IMkbDiagnosis) {
    state.item = new MkbDiagnosis(item);
  },
};

export default mutations;
