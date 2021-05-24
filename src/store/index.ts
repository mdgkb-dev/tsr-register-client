import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './types';

import { auth } from './modules/auth';
import { patients } from './modules/patients';
import { representatives } from './modules/representatives';
import documents from './modules/documents/documents';
import { insuranceCompanies } from './modules/insuranceCompanies';
import { anthropometry } from './modules/anthropometry';
import documentScans from './modules/documentScans/documentScans';
import { mkb } from './modules/mkb';
import { disabilities } from './modules/disabilities';
import sma from './modules/sma/sma';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {
    layout(state) {
      return state.layout;
    },
  },
  mutations: {
    setLayout(state, payload) {
      state.layout = payload;
    },
  },
  modules: {
    auth,
    patients,
    representatives,
    documents,
    insuranceCompanies,
    anthropometry,
    documentScans,
    mkb,
    disabilities,
    sma,
  },
};

export default new Vuex.Store<RootState>(store);
