import { Module } from 'vuex';

import RegisterGroup from '@/classes/RegisterGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  registerGroups: [],
  registerGroup: new RegisterGroup(),
};

const namespaced = true;

export const registerGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
