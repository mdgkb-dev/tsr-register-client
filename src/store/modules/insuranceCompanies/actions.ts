import { ActionTree } from 'vuex';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('insurance-companies');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IInsuranceCompany[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IInsuranceCompany>({ query: id }));
  },
  create: async ({ commit }, payload: IInsuranceCompany): Promise<void> => {
    commit('create', await httpClient.post<IInsuranceCompany, IInsuranceCompany>({ payload }));
  },
  edit: async ({ commit }, payload: IInsuranceCompany): Promise<void> => {
    commit('update', await httpClient.put<IInsuranceCompany, IInsuranceCompany>({ payload, query: payload.id }));
  },
  delete: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete<IInsuranceCompany, IInsuranceCompany>({ query: id });
    commit('delete', id);
  },
};

export default actions;
