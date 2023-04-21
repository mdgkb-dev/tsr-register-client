import Vuex, { StoreOptions } from 'vuex';

import { admin } from '@/store/modules/admin';
import auth from '@/store/modules/auth';
import { cropper } from '@/store/modules/cropper';
import { filter } from '@/store/modules/filter';
import { main } from '@/store/modules/main';
import { meta } from '@/store/modules/meta';
import { mkbItems } from '@/store/modules/mkbItems';
import { pagination } from '@/store/modules/pagination';
import { patients } from '@/store/modules/patients';
import { patientsResearches } from '@/store/modules/patientsResearches';
import { patientsResearchesPools } from '@/store/modules/patientsResearchesPools';
import { registers } from '@/store/modules/registers';
import { representatives } from '@/store/modules/representatives';
import { representativeTypes } from '@/store/modules/representativeTypes';
import { researches } from '@/store/modules/researches';
import { researchesPools } from '@/store/modules/researchesPools';
import { researchesResults } from '@/store/modules/researchesResults';
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
    researchesResults,
    auth,
    cropper,
    // disabilities,
    // documentTypes,
    // drugs,
    // files,
    filter,
    // insuranceCompanies,
    main,
    meta,
    mkbItems,
    pagination,
    patients,
    researches,
    researchesPools,
    patientsResearchesPools,
    // registerProperties,
    // registerPropertiesToUser,
    // registerQueries,
    registers,
    representatives,
    representativeTypes,
    users,
    search,
    admin,
    patientsResearches,
    // regions,
  },
};

export default new Vuex.Store<RootState>(store);
