import { Module } from 'vuex';

import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  isDrawerOpen: false,
};

const namespaced = true;

export const drawer: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
