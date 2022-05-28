import { Module } from 'vuex';

import MkbGroup from '@/classes/mkb/MkbGroup';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  items: [],
  item: new MkbGroup(),
};

const namespaced = true;

export const mkbGroups: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
