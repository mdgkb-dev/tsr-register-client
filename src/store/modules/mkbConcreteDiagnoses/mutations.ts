import { MutationTree } from 'vuex';

import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMkbConcreteDiagnosis[]) {
    state.items = items.map((i: IMkbConcreteDiagnosis) => new MkbConcreteDiagnosis(i));
  },
  set(state, item: IMkbConcreteDiagnosis) {
    state.item = new MkbConcreteDiagnosis(item);
  },
};

export default mutations;
