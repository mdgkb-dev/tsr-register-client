import { MutationTree } from 'vuex';

import UserAuthorized from '@/classes/user/UserAuthorized';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

import State from './state';

const mutations: MutationTree<State> = {
  setUser(state, user: IUserAuthorized) {
    state.user = new UserAuthorized(user);
  },
  setToken(state, token: string) {
    state.token = token;
  },
  setIsAuth(state, isAuth: boolean) {
    state.isAuth = isAuth;
  },
  setDoesLoginExist(state, doesExist: boolean) {
    state.doesLoginExist = doesExist;
  },
};

export default mutations;
