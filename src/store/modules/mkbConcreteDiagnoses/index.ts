import { Module } from 'vuex';

import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new MkbConcreteDiagnosis(),
};

const namespaced = true;

export const mkbConcreteDiagnoses: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
