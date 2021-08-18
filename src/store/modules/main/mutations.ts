import { MutationTree } from 'vuex';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  openDrawer(state) {
    state.isDrawerOpen = true;
  },
  closeDrawer(state) {
    state.isDrawerOpen = false;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
