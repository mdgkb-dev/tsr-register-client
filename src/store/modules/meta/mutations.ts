import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    state.count = count;
  },
};

export default mutations;
