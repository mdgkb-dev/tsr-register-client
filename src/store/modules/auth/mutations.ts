import Cookies from 'js-cookie';
import { MutationTree } from 'vuex';

import UserAuthorized from '@/classes/user/UserAuthorized';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

import { State } from './state';

const mutations: MutationTree<State> = {
  authorize(state, user: IUserAuthorized) {
    state.user = new UserAuthorized(user);
    state.isAuthorized = true;
    Cookies.set('user_id', user.id);
    const cookie = Cookies.get('user_sid');

    if (cookie) {
      window.localStorage.setItem('user_sid', cookie);
    }
  },
  deAuthorize(state) {
    state.isAuthorized = false;
    state.user = undefined;
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
  },
  setError(state, errorMessage: string) {
    state.authorizationError = errorMessage;
  },
  updateAuthUser(state, payload: IUserAuthorized) {
    state.user = payload;
  },
};

export default mutations;
