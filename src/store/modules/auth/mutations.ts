import { MutationTree } from 'vuex';

import User from '@/classes/User';
import ITokens from '@/interfaces/ITokens';
import IUser from '@/interfaces/IUser';
import TokenService from '@/services/Token';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: IUser) {
    state.user = new User(user);
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearUser(state) {
    localStorage.removeItem('user');
    state.user = new User();
  },
  setTokens(state, tokens: ITokens) {
    TokenService.setTokens(tokens);
  },
  clearTokens(state) {
    TokenService.clearTokens();
  },
  setIsAuth(state, isAuth: boolean) {
    state.isAuth = isAuth;
  },
};

export default mutations;
