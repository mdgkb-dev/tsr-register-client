import { MutationTree } from 'vuex';

import IMainHeader from '@/interfaces/shared/IMainHeader';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  openDrawer(state) {
    state.isDrawerOpen = true;
  },
  closeDrawer(state) {
    state.isDrawerOpen = false;
  },
  setMainHeader(state, item: IMainHeader) {
    state.mainHeader = item;
  },
  setActiveMenu(state, item: string) {
    state.activeMenu = item;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
