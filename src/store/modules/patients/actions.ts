import { ActionTree } from 'vuex';

import Patient from '@/classes/Patient';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('patients');
const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Patient, State>(httpClient),
  getBySnils: async ({ commit }, snils: string) => {
    commit('setExists', await httpClient.get<Patient>({ query: 'by-snils/' + snils }));
  },
  getActualAnthropomentry: async ({ commit }, paientId: string) => {
    commit('setActualAnthropomentry', await httpClient.get<IAnthropomentry>({ query: 'actual-anthropometry/' + paientId }));
  },
};

export default actions;
