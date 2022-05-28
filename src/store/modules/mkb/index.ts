import { Module } from 'vuex';

import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  mkbClasses: [],
  mkbGroups: [],
  mkbFilteredDiagnosis: [],
  mkbFilteredSubDiagnosis: [],
  mkbFilteredConcreteDiagnosis: [],
  mkbDiagnosis: [],
  mkbSubDiagnosis: [],
  mkbConcreteDiagnosis: [],
};

const namespaced = true;

export const mkb: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
