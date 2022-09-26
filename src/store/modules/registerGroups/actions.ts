import { ActionTree } from 'vuex';

import IRegisterGroup from '@/interfaces/IRegisterGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('register-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRegisterGroup[]>());
  },
  get: async ({ commit }, registerGroupId: string) => {
    commit('set', await httpClient.get<IRegisterGroup>({ query: registerGroupId }));
  },
  create: async ({ commit }, payload: IRegisterGroup): Promise<void> => {
    commit('create', await httpClient.post<IRegisterGroup, IRegisterGroup>({ payload }));
  },
  edit: async ({ commit }, payload: IRegisterGroup): Promise<void> => {
    commit('update', await httpClient.put<IRegisterGroup, IRegisterGroup>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRegisterGroup, IRegisterGroup>({ query: id });
    commit('delete', id);
  },
};

export default actions;
