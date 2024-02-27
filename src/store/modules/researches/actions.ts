import { ActionTree } from 'vuex';

import Research from '@/classes/Research';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('researches');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Research, State>(httpClient),
  xlsx: async (_, { researchId, patientId }) => {
    const query = `xlsx/${researchId}/${patientId}`;
    await httpClient.get({ query: query, isBlob: true, downloadFileName: 'data.xlsx' });
  },
};

export default actions;
