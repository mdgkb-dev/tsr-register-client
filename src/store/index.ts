import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';

import documentTypes from '@/store/modules/documentTypes';
import files from '@/store/modules/files';
import sma from '@/store/modules/sma/sma';
import { anthropometry } from '@/store/modules/anthropometry';
import { auth } from '@/store/modules/auth';
import { disabilities } from '@/store/modules/disabilities';
import { insuranceCompanies } from '@/store/modules/insuranceCompanies';
import { mkb } from '@/store/modules/mkb';
import { patients } from '@/store/modules/patients';
import { representativeTypes } from '@/store/modules/representativeTypes';
import { representatives } from '@/store/modules/representatives';
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
    files,
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
