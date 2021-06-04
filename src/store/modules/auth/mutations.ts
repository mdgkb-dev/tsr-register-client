import { MutationTree } from 'vuex';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import Cookies from 'js-cookie';
import { State } from './state';

const mutations: MutationTree<State> = {
  authorize(state, userData: IUserAuthorized) {
    state.userId = userData.id;
    state.userLogin = userData.login;
    state.userRegion = userData.region;
    state.isAuthorized = true;
    Cookies.set('user_id', userData.id);
    const cookie = Cookies.get('user_sid');

    if (cookie) {
      window.localStorage.setItem('user_sid', cookie);
    }
  },
  deAuthorize(state) {
    state.userId = '';
    state.userLogin = '';
    state.userRegion = '';
    state.isAuthorized = false;
    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
  },
  setError(state, errorMessage: string) {
    state.authorizationError = errorMessage;
  },
};

export default mutations;
