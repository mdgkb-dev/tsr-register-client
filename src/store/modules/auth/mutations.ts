import { MutationTree } from 'vuex';

import State from './state';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import UserAuthorized from '@/classes/user/UserAuthorized';

const mutations: MutationTree<State> = {
  setUser(state, user: IUserAuthorized) {
    state.user = new UserAuthorized(user);
    console.log(state.user);
  },
  setToken(state, token: string) {
    state.token = token;
  },
  setIsAuth(state, isAuth: boolean) {
    state.isAuth = isAuth;
  },
};

export default mutations;
