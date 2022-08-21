import { ActionTree } from 'vuex';

import IRegion from '@/interfaces/IRegion';
import IValueType from '@/interfaces/valueTypes/IValueType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('regions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRegion[]>());
  },
  get: async ({ commit }, regionId: string) => {
    commit('set', await httpClient.get<IRegion>({ query: regionId }));
  },
  create: async ({ commit }, payload: IRegion): Promise<void> => {
    commit('create', await httpClient.post<IRegion, IRegion>({ payload }));
  },
  edit: async ({ commit }, payload: IRegion): Promise<void> => {
    commit('update', await httpClient.put<IRegion, IRegion>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRegion, IRegion>({ query: id });
    commit('delete', id);
  },
  getValueTypes: async ({ commit }): Promise<void> => {
    commit('setValueTypes', await httpClient.get<IValueType>({ query: 'value-types' }));
  },
};

export default actions;
