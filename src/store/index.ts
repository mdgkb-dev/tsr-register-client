import Vuex, { StoreOptions } from 'vuex';

import { anthropometry } from '@/store/modules/anthropometry';
import { auth } from '@/store/modules/auth';
import { disabilities } from '@/store/modules/disabilities';
import documentTypes from '@/store/modules/documentTypes';
import files from '@/store/modules/files';
import { insuranceCompanies } from '@/store/modules/insuranceCompanies';
import { mkb } from '@/store/modules/mkb';
import { patients } from '@/store/modules/patients';
import { registerGroups } from '@/store/modules/registerGroups';
import { registerProperties } from '@/store/modules/registerProperties';
import { registers } from '@/store/modules/registers';
import { representatives } from '@/store/modules/representatives';
import { representativeTypes } from '@/store/modules/representativeTypes';
import sma from '@/store/modules/sma/sma';
import { users } from '@/store/modules/users';

import { RootState } from './types';

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
    registerGroups,
    registerProperties,
    registers,
    representativeTypes,
    representatives,
    sma,
    users,
  },
};

export default new Vuex.Store<RootState>(store);
