import { ActionTree } from 'vuex';

import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('representative-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRepresentativeType[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IRepresentativeType>({ query: id }));
  },
  create: async ({ commit }, payload: IRepresentativeType): Promise<void> => {
    commit('create', await httpClient.post<IRepresentativeType, IRepresentativeType>({ payload }));
  },
  edit: async ({ commit }, payload: IRepresentativeType): Promise<void> => {
    commit('update', await httpClient.put<IRepresentativeType, IRepresentativeType>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRepresentativeType, IRepresentativeType>({ query: id });
    commit('delete', id);
  },
};

export default actions;
