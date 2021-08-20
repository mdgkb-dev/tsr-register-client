import { Module } from 'vuex';

import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    isDrawerOpen: false,
  };
};

const state = getDefaultState();
const namespaced = true;

export const main: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
