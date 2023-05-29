import { GetterTree } from 'vuex';

import IAdminMenu from '@/interfaces/IAdminMenu';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  headerParams(state): AdminHeaderParams {
    return state.headerParams;
  },
  isCollapseSideMenu(state): boolean {
    return state.isCollapseSideMenu;
  },
  menus(state): IAdminMenu[] {
    // const user = UserService.getUser();
    // if (!user) {
    //   return [];
    // }
    return state.menus;
  },
  isDrawerOpen(state): boolean {
    return state.isDrawerOpen;
  },
  showHeader(state): boolean {
    return state.showHeader;
  },
  headSpinner(state): boolean {
    return state.headSpinner;
  },
  headSuccess(state): boolean {
    return state.headSuccess;
  },
};

export default getters;
