import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './types';

import humans from './modules/humans/humans';
import auth from './modules/auth/auth';
import patients from './modules/patients/patients';
import representatives from './modules/representatives/representatives';
import documents from './modules/documents/documents';
import insuranceCompanies from './modules/insuranceCompanies/insuranceCompanies';
import anthropometry from './modules/anthropometry/anthropometry';
import documentScans from './modules/documentScans/documentScans';
import mkb from './modules/mkb/mkb';
import disabilities from './modules/disabilities/disabilities';
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
    humans,
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
