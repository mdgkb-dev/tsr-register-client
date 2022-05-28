import { Module } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new MkbDiagnosis(),
};

const namespaced = true;

export const mkbDiagnoses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
