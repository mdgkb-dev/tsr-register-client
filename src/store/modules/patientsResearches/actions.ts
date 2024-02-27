import { ActionTree } from 'vuex';

import PatientResearch from '@/classes/PatientResearch';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('patients-researches');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientResearch, State>(httpClient),
  getPatientResearch: async ({ commit }, { researchId, patientId }) => {
    commit('set', await httpClient.get<PatientResearch>({ query: `patient-research/${patientId}/${researchId}` }));
  },
};

export default actions;
