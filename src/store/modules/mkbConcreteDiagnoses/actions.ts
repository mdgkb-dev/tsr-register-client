import { ActionTree } from 'vuex';

import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('mkb-concrete-diagnoses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IMkbConcreteDiagnosis[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IMkbConcreteDiagnosis>({ query: id }));
  },
};

export default actions;
