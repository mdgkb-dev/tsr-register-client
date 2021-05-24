import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import IUserLogin from '@/interfaces/users/IUserLogin';
import IUserRegister from '@/interfaces/users/IUserRegister';
import Cookies from 'js-cookie';
import { State } from './state';

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, userData: IUserLogin) => {
    let response;
    try {
      response = await fetch(`${process.env.VUE_APP_BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      return;
    }

    if (response?.status === 401) {
      commit('setRegistrationError', 'Проверьте корректность введённых данных');
      return;
    }

    if (response?.status !== 200) {
      commit('setRegistrationError', 'Не удалось войти. Пожалуйста, обратитесь к разработчикам.');
      return;
    }

    commit('authorize', await response.json());
  },
  register: async ({ commit }, userData: IUserRegister) => {
    let response;

    try {
      response = await fetch(`${process.env.VUE_APP_BASE_URL}user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.log(error);
      return;
    }

    if (response?.status !== 200) {
      commit('authorizationError', 'Не удалось зарегистрироваться. Пожалуйста, обратитесь к разработчикам.');
      return;
    }

    commit('authorize', await response.json());
  },
  logout: async ({ commit }) => {
    let response;

    try {
      response = await fetch(`${process.env.VUE_APP_BASE_URL}logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.log(error);
      return;
    }
    console.log(response);
    if (response.status !== 200) {
      console.log('Ошибка выхода.');
    }

    Cookies.remove('user_sid');
    window.localStorage.removeItem('user_sid');
    commit('deAuthorize');
  },
  deAuthorize: ({ commit }) => {
    commit('deAuthorize');
  },
  setAuthorization: async ({ commit }) => {
    let response;
    try {
      response = await fetch(`${process.env.VUE_APP_BASE_URL}login`);
    } catch (error) {
      commit('deAuthorize');
      return;
    }
    if (response.status === 200 || response.status === 304) {
      commit('authorize', await response.json());
      return;
    }
    commit('deAuthorize');
  },
};

export default actions;
