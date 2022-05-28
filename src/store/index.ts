import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import auth from '@/store/modules/auth';
import { cropper } from '@/store/modules/cropper';
import { disabilities } from '@/store/modules/disabilities';
import documentTypes from '@/store/modules/documentTypes';
import { drugs } from '@/store/modules/drugs';
import files from '@/store/modules/files';
import { filter } from '@/store/modules/filter';
import { insuranceCompanies } from '@/store/modules/insuranceCompanies';
import { main } from '@/store/modules/main';
import { meta } from '@/store/modules/meta';
import { mkb } from '@/store/modules/mkb';
import { mkbConcreteDiagnoses } from '@/store/modules/mkbConcreteDiagnoses';
import { mkbDiagnoses } from '@/store/modules/mkbDiagnoses';
import { mkbGroups } from '@/store/modules/mkbGroups';
import { mkbSubDiagnoses } from '@/store/modules/mkbSubDiagnoses';
import { pagination } from '@/store/modules/pagination';
import { patients } from '@/store/modules/patients';
import { registerGroups } from '@/store/modules/registerGroups';
import { registerProperties } from '@/store/modules/registerProperties';
import { registerPropertiesToUser } from '@/store/modules/registerPropertiesToUser';
import registerQueries from '@/store/modules/registerQueries';
import { registers } from '@/store/modules/registers';
import { representatives } from '@/store/modules/representatives';
import { representativeTypes } from '@/store/modules/representativeTypes';
import search from '@/store/modules/search';
import { users } from '@/store/modules/users';

import RootState from './types';

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
    cropper,
    disabilities,
    documentTypes,
    drugs,
    files,
    filter,
    insuranceCompanies,
    main,
    meta,
    mkb,
    pagination,
    patients,
    registerGroups,
    registerProperties,
    registerPropertiesToUser,
    registerQueries,
    registers,
    representatives,
    representativeTypes,
    users,
    search,
    admin,
    mkbGroups,
    mkbDiagnoses,
    mkbSubDiagnoses,
    mkbConcreteDiagnoses,
  },
};

export default new Vuex.Store<RootState>(store);
