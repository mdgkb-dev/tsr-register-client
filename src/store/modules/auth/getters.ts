import { GetterTree } from 'vuex';

import { RootState } from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  getUserId(state): string | undefined {
    return state.userId;
  },
  getUserLogin(state): string | undefined {
    return state.userLogin;
  },
  getUserRegion(state): string | undefined {
    return state.userRegion;
  },
  isAuthorized(state): boolean | undefined {
    return state.isAuthorized;
  },
  authError(state): string | undefined {
    return state.authorizationError;
  },
};

export default getters;
