import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import { State } from './state';

const httpClient = new HttpClient('register-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  get: async ({ commit }, registerGroupId: string) => {
    commit('set', await httpClient.get({ query: registerGroupId }));
  },
  create: async ({ commit }, payload: IRegisterGroup): Promise<void> => {
    commit('create', await httpClient.post({ payload }));
  },
  edit: async ({ commit }, payload: IRegisterGroup): Promise<void> => {
    commit('update', await httpClient.put({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete(id);
    commit('delete', id);
  },
};

export default actions;
