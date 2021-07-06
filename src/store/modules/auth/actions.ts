import { ActionTree } from 'vuex';

import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import IUserLogin from '@/interfaces/users/IUserLogin';
import IUserRegister from '@/interfaces/users/IUserRegister';
import HttpClient from '@/services/HttpClient';
import { RootState } from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

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
      commit('setError', 'Проверьте корректность введённых данных');
      return;
    }

    if (response?.status !== 200) {
      commit('setError', 'Не удалось войти. Пожалуйста, обратитесь к разработчикам.');
      return;
    }
    commit('setError', '');
    commit('authorize', await response.json());
  },
  register: async ({ commit }, userData: IUserRegister) => {
    let response;

    try {
      response = await fetch(`${process.env.VUE_APP_BASE_URL}users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.log(error);
      return;
    }

    if (response?.status !== 200) {
      commit('setError', 'Не удалось зарегистрироваться. Пожалуйста, обратитесь к разработчикам.');
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
    if (response.status !== 200) {
      console.log('Ошибка выхода.');
    }

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
    console.log();
    if (response.status === 200 || response.status === 304) {
      commit('authorize', await response.json());
      return;
    }
    commit('deAuthorize');
  },
  editAuthUser: async ({ commit }, payload: IUserAuthorized): Promise<void> => {
    commit('updateAuthUser', await httpClient.put({ payload, query: payload.id }));
  },
};

export default actions;
