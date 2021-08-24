import { ActionTree } from 'vuex';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('anthropometries');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IAnthropometry[]>());
  },
  get: async ({ commit }, anthropometryId: string) => {
    commit('set', await httpClient.get<IAnthropometry>({ query: anthropometryId }));
  },
  create: async ({ commit }, payload: IAnthropometry): Promise<void> => {
    commit('create', await httpClient.post<IAnthropometry, IAnthropometry>({ payload }));
  },
  edit: async ({ commit }, payload: IAnthropometry): Promise<void> => {
    commit('update', await httpClient.put<IAnthropometry, IAnthropometry>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IAnthropometry, IAnthropometry>({ query: id });
    commit('delete', id);
  },
};

export default actions;
