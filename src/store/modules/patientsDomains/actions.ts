import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('patients-domains');
const actions: ActionTree<State, RootState> = {
  addToDomain: async (_, patientId: string) => {
    await httpClient.post({ query: 'to-domain', isFormData: true, payload: { patientId: patientId } });
  },
};

export default actions;
