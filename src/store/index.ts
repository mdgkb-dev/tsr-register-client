import { createStore } from 'vuex';

import humans from './modules/humans';
import auth from './modules/auth';
import patients from './modules/patients';
import representatives from './modules/representatives';
import documents from './modules/documents';
import insuranceCompanies from './modules/insuranceCompanies';
import anthropometry from './modules/anthropometry';
import documentScans from './modules/documentScans';
import mkb from './modules/mkb';
import disabilities from './modules/disabilities';

export default createStore({
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
  actions: {},
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
  },
});
