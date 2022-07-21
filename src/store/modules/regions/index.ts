import { Module } from 'vuex';

import Region from '@/classes/Region';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new Region(),
};

const namespaced = true;

export const regions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
