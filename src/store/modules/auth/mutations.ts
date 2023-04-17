import { MutationTree } from 'vuex';

import User from '@/classes/User';
import ITokens from '@/interfaces/ITokens';
import TokenService from '@/services/Token';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: User) {
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
  showWarning(state, value: boolean) {
    state.showWarning = value;
  },
  authOnly(state, value: boolean) {
    state.authOnly = value;
  },
  openModal(state, loginStatus: 'login' | 'register' | 'forgotPassword' | 'passwordChange') {
    state.loginStatus = loginStatus;
    state.authModalVisible = true;
  },
};

export default mutations;
