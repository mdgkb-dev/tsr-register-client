import { GetterTree } from 'vuex';

import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import { RootState } from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  user(state): IUserAuthorized | undefined {
    return state.user;
  },
  getUserId(state): string | undefined {
    return state.user ? state.user.id : undefined;
  },
  getUserLogin(state): string | undefined {
    return state.user ? state.user.login : undefined;
  },
  getUserRegion(state): string | undefined {
    return state.user ? state.user.region : undefined;
  },
  isAuthorized(state): boolean | undefined {
    return state.isAuthorized;
  },
  authError(state): string | undefined {
    return state.authorizationError;
  },
};

export default getters;
