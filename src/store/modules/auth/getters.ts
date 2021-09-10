import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import State from './state';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

const getters: GetterTree<State, RootState> = {
  building(state): string {
    return state.token;
  },
  user(state): IUserAuthorized | undefined {
    return state.user;
  },
  isAuth(state): boolean {
    return state.isAuth;
  },
};

export default getters;
