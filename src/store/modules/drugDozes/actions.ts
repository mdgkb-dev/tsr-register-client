import { ActionTree } from 'vuex';

import DrugDoze from '@/classes/DrugDoze';
import DrugNeedingOptions from '@/classes/DrugNeedingOptions';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('drug-dozes');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugDoze, State>(httpClient),
  calculateNeeding: async ({ commit }, options: DrugNeedingOptions) => {
    commit('setDrugNeeding', await httpClient.post<DrugNeedingOptions, undefined>({ query: 'calculate-needing', isFormData: true, payload: options }));
  },
};

export default actions;
