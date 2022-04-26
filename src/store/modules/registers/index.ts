import { Module } from 'vuex';

import Register from '@/classes/registers/Register';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  registers: [],
  item: new Register(),
  valueTypes: [],
  activeCollapseName: '',
};

const namespaced = true;

export const registers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
