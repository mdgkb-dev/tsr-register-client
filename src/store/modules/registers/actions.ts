import { ActionTree } from 'vuex';

import IRegister from '@/interfaces/registers/IRegister';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('registers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRegister[]>());
  },
  get: async ({ commit }, registerId: string) => {
    commit('set', await httpClient.get<IRegister>({ query: registerId }));
  },
  create: async ({ commit }, payload: IRegister): Promise<void> => {
    commit('create', await httpClient.post<IRegister, IRegister>({ payload }));
  },
  edit: async ({ commit }, payload: IRegister): Promise<void> => {
    commit('update', await httpClient.put<IRegister, IRegister>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRegister, IRegister>({ query: id });
    commit('delete', id);
  },
};

export default actions;
