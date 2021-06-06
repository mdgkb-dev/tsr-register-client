import Vuex, { StoreOptions } from 'vuex';

import { RootState } from './types';
import documentTypes from './modules/documentTypes';
import sma from './modules/sma/sma';
import { anthropometry } from './modules/anthropometry';
import { auth } from './modules/auth';
import { disabilities } from './modules/disabilities';
import { insuranceCompanies } from './modules/insuranceCompanies';
import { mkb } from './modules/mkb';
import { patients } from './modules/patients';
import { representativeTypes } from './modules/representativeTypes';
import { representatives } from './modules/representatives';
import { users } from '@/store/modules/users';

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
    anthropometry,
    auth,
    disabilities,
    documentTypes,
    insuranceCompanies,
    mkb,
    patients,
    representativeTypes,
    representatives,
    sma,
    users,
  },
};

export default new Vuex.Store<RootState>(store);
