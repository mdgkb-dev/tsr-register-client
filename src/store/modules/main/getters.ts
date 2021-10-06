import { GetterTree } from 'vuex';

import IMainHeader from '@/interfaces/shared/IMainHeader';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  isDrawerOpen(state): boolean {
    return state.isDrawerOpen;
  },
  mainHeader(state): IMainHeader {
    return state.mainHeader;
  },
  activeMenu(state): string {
    return state.activeMenu;
  },
};

export default getters;
