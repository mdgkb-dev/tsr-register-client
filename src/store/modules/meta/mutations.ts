import { MutationTree } from 'vuex';

import ICount from '@/interfaces/meta/ICount';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: ICount[]) {
    state.count = Number(count[0].count);
  },
};

export default mutations;
