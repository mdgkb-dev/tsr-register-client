import { ActionTree } from 'vuex';

import IDisability from '@/interfaces/disabilities/IDisability';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('disabilities');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDisability[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDisability>({ query: id }));
  },
  create: async ({ commit }, payload: IDisability): Promise<void> => {
    commit('create', await httpClient.post<IDisability, IDisability>({ payload }));
  },
  edit: async ({ commit }, payload: IDisability): Promise<void> => {
    commit('update', await httpClient.put<IDisability, IDisability>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IDisability, IDisability>({ query: id });
    commit('delete', id);
  },
};

export default actions;
