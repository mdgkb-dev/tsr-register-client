import { ActionTree } from 'vuex';

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import HttpClient from '@/services/HttpClient';
import { RootState } from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('register-properties');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  getValueTypes: async ({ commit }): Promise<void> => {
    commit('setValueTypes', await httpClient.get({ query: 'value-types' }));
  },
  get: async ({ commit }, registerPropertyId: string) => {
    commit('set', await httpClient.get({ query: registerPropertyId }));
  },
  create: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('create', await httpClient.post({ payload }));
  },
  edit: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('update', await httpClient.put({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;
