import { ActionTree } from 'vuex';

import IUser from '@/interfaces/users/IUser';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('users');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get({ query: id }));
  },
  create: async ({ commit }, payload: IUser): Promise<void> => {
    commit('create', await httpClient.post({ payload }));
  },
  edit: async ({ commit }, payload: IUser): Promise<void> => {
    commit('update', await httpClient.put({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;
