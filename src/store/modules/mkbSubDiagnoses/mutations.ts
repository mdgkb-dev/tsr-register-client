import { MutationTree } from 'vuex';

import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMkbSubDiagnosis[]) {
    state.items = items.map((i: IMkbSubDiagnosis) => new MkbSubDiagnosis(i));
  },
  set(state, item: IMkbSubDiagnosis) {
    state.item = new MkbSubDiagnosis(item);
  },
};

export default mutations;
