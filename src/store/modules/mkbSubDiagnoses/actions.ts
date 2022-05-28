import { ActionTree } from 'vuex';

import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('mkb-sub-diagnoses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IMkbSubDiagnosis[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IMkbSubDiagnosis>({ query: id }));
  },
};

export default actions;
