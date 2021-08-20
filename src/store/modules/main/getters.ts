import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  isDrawerOpen(state): boolean {
    return state.isDrawerOpen;
  },
};

export default getters;
