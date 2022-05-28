import { ActionTree } from 'vuex';

import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('mkb-diagnoses');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IMkbDiagnosis[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IMkbDiagnosis>({ query: id }));
  },
};

export default actions;
