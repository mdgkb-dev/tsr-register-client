import Vuex, { StoreOptions } from 'vuex';

import auth from '@/store/modules/auth';
import { disabilities } from '@/store/modules/disabilities';
import documentTypes from '@/store/modules/documentTypes';
import files from '@/store/modules/files';
import { insuranceCompanies } from '@/store/modules/insuranceCompanies';
import { main } from '@/store/modules/main';
import { meta } from '@/store/modules/meta';
import { mkb } from '@/store/modules/mkb';
import { patients } from '@/store/modules/patients';
import { registerGroups } from '@/store/modules/registerGroups';
import { registerProperties } from '@/store/modules/registerProperties';
import { registers } from '@/store/modules/registers';
import { representatives } from '@/store/modules/representatives';
import { representativeTypes } from '@/store/modules/representativeTypes';
import { users } from '@/store/modules/users';
import { cropper } from '@/store/modules/cropper';

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
    disabilities,
    documentTypes,
    cropper,
    files,
    insuranceCompanies,
    main,
    meta,
    mkb,
    patients,
    registerGroups,
    registerProperties,
    registers,
    representatives,
    representativeTypes,
    users,
  },
};

export default new Vuex.Store<RootState>(store);
