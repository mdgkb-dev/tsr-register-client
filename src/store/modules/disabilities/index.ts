import { Module } from 'vuex';
import { RootState } from '@/store/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  disabilities: [],
  disability: undefined,
};

const namespaced = true;

export const disabilities: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
