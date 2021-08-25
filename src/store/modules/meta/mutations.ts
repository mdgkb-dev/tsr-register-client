import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    console.log(count);
    state.count = count;
  },
};

export default mutations;
