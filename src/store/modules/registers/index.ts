import { Module } from 'vuex';

import { RootState } from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';
import Register from '@/classes/registers/Register';

export const state: State = {
  registers: [],
  register: new Register(),
};

const namespaced = true;

export const registers: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
