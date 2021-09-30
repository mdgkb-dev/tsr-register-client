import { GetterTree } from 'vuex';

import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import RootState from '@/store/types';

import State from './state';

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
  doesLoginExist(state): boolean {
    return state.doesLoginExist;
  },
};

export default getters;
