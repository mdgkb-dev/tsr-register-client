import Vuex, { StoreOptions } from 'vuex';

import { users } from '@/store/modules/users';
import { RootState } from './types';

import { auth } from './modules/auth';
import { patients } from './modules/patients';
import { registers } from './modules/registers';
import { registerGroups } from './modules/registerGroups';
import { representatives } from './modules/representatives';
import documents from './modules/documents';
import { insuranceCompanies } from './modules/insuranceCompanies';
import { anthropometry } from './modules/anthropometry';
import documentScans from './modules/documentScans';
import { mkb } from './modules/mkb';
import { disabilities } from './modules/disabilities';
import sma from './modules/sma/sma';
import { representativeTypes } from './modules/representativeTypes';

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
    registers,
    registerGroups,
    documents,
    insuranceCompanies,
    anthropometry,
    documentScans,
    mkb,
    disabilities,
    sma,
    representativeTypes,
    users,
  },
};

export default new Vuex.Store<RootState>(store);
