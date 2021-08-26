import { Module } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  drugs: [],
  drug: new Drug(),
};

const namespaced = true;

export const drugs: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
