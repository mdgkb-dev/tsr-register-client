import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IRegister from '@/interfaces/IRegister';
import IValueType from '@/interfaces/valueTypes/IValueType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('registers');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRegister[]>());
  },
  get: async ({ commit }, filterQuery: IFilterQuery) => {
    commit('set', await httpClient.get<IRegister>({ query: filterQuery.toUrl() }));
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
  getValueTypes: async ({ commit }): Promise<void> => {
    commit('setValueTypes', await httpClient.get<IValueType>({ query: 'value-types' }));
  },
};

export default actions;
