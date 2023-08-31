import { ActionTree } from 'vuex';

import Patient from '@/classes/Patient';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('patients');
const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Patient, State>(httpClient),
  getBySnils: async ({ commit }, snils: string) => {
    commit('setExists', await httpClient.get<Patient>({ query: 'by-snils/' + snils }));
  },
};

export default actions;
