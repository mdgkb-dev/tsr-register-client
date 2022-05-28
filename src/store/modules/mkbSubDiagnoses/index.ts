import { Module } from 'vuex';

import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new MkbSubDiagnosis(),
};

const namespaced = true;

export const mkbSubDiagnoses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
