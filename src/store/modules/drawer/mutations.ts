import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  openDrawer(state) {
    state.isDrawerOpen = true;
  },
  closeDrawer(state) {
    state.isDrawerOpen = false;
  },
};

export default mutations;
