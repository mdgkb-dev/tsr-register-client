import { ActionTree } from 'vuex';

import IRegisterQuery from '@/interfaces/IRegisterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('register-queries');

const actions: ActionTree<State, RootState> = {
  create: async ({ commit }, payload: IRegisterQuery): Promise<void> => {
    commit('create', await httpClient.post<IRegisterQuery, IRegisterQuery>({ payload }));
  },
  getAll: async ({ commit }): Promise<void> => {
    const registerQueries: IRegisterQuery[] | void = await httpClient.get<IRegisterQuery[]>();
    if (registerQueries && registerQueries.length > 0) {
      commit('setAll', registerQueries);
      return;
    }

    commit('setAll', []);
  },
  get: async ({ commit }, registerQueryId: string) => {
    commit('set', await httpClient.get<IRegisterQuery>({ query: registerQueryId }));
  },
  edit: async ({ commit }, payload: IRegisterQuery): Promise<void> => {
    commit('update', await httpClient.put<IRegisterQuery, IRegisterQuery>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRegisterQuery, IRegisterQuery>({ query: id });
    commit('delete', id);
  },
  execute: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IRegisterQuery>({ query: `execute/${id}`, isBlob: true });
    console.log(res);
    // commit('delete', id);
  },
};

export default actions;
