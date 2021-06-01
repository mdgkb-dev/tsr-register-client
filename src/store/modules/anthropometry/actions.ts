import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import HttpClient from '@/services/HttpClient';
import { State } from './state';

const httpClient = new HttpClient('anthropometries');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, anthropometryId: string) => {
    commit('set', await httpClient.get(anthropometryId));
  },
  create: async ({ commit }, payload: IAnthropometry): Promise<void> => {
    commit('create', await httpClient.post({ payload }));
  },
  edit: async ({ commit }, payload: IAnthropometry): Promise<void> => {
    commit('update', await httpClient.put(payload, payload.id));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    commit('delete', await httpClient.delete(id));
  },
};

export default actions;
