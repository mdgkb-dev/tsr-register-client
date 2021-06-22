import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import { State } from './state';

const httpClient = new HttpClient('register-properties');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  getValueTypes: async ({ commit }): Promise<void> => {
    commit('setValueTypes', await httpClient.get('value-types'));
  },
  get: async ({ commit }, registerPropertyId: string) => {
    commit('set', await httpClient.get(registerPropertyId));
  },
  create: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('create', await httpClient.post(payload));
  },
  edit: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('update', await httpClient.put(payload, payload.id));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;