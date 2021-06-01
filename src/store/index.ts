import Vuex, { StoreOptions } from 'vuex';

import { users } from '@/store/modules/users';
import { RootState } from './types';

import sma from './modules/sma/sma';
import { anthropometry } from './modules/anthropometry';
import { auth } from './modules/auth';
import { disabilities } from './modules/disabilities';
import { insuranceCompanies } from './modules/insuranceCompanies';
import { mkb } from './modules/mkb';
import { patients } from './modules/patients';
import { representativeTypes } from './modules/representativeTypes';
import { representatives } from './modules/representatives';

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
    insuranceCompanies,
    anthropometry,
    mkb,
    disabilities,
    sma,
    representativeTypes,
    users,
  },
};

export default new Vuex.Store<RootState>(store);
