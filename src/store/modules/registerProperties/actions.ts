import { ActionTree } from 'vuex';

import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('register-properties');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IRegisterProperty[]>());
  },
  getValueTypes: async ({ commit }): Promise<void> => {
    commit('setValueTypes', await httpClient.get<IValueType>({ query: 'value-types' }));
  },
  get: async ({ commit }, registerPropertyId: string) => {
    commit('set', await httpClient.get<IRegisterProperty>({ query: registerPropertyId }));
  },
  create: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('create', await httpClient.post<IRegisterProperty, IRegisterProperty>({ payload }));
  },
  edit: async ({ commit }, payload: IRegisterProperty): Promise<void> => {
    commit('update', await httpClient.put<IRegisterProperty, IRegisterProperty>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IRegisterProperty, IRegisterProperty>({ query: id });
    commit('delete', id);
  },
  getAllForRegisterId: async ({ commit }, registerId: string): Promise<void> => {
    commit('setAll', await httpClient.get<IRegisterProperty[]>({ query: `?registerId=${registerId}` }));
  },
};

export default actions;
