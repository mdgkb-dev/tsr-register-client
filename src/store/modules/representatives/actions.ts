import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import { State } from './state';

const httpClient = new HttpClient('representatives');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get(id));
  },
  create: async ({ commit }, payload: IRepresentative): Promise<void> => {
    commit('create', await httpClient.post(payload));
  },
  edit: async ({ commit }, payload: IRepresentative): Promise<void> => {
    commit('update', await httpClient.put(payload, payload.id));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    commit('delete', await httpClient.delete(id));
  },
};

export default actions;