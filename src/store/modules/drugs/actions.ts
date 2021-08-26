import { ActionTree } from 'vuex';

import IDrug from '@/interfaces/drugs/IDrug';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('drugs');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDrug[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDrug>({ query: id }));
  },
  create: async ({ commit }, payload: IDrug): Promise<void> => {
    commit('create', await httpClient.post<IDrug, IDrug>({ payload }));
  },
  edit: async ({ commit }, payload: IDrug): Promise<void> => {
    commit('update', await httpClient.put<IDrug, IDrug>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IDrug, IDrug>({ query: id });
    commit('delete', id);
  },
};

export default actions;
