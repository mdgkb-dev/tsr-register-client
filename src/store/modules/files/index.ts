import { Module } from 'vuex';
import { RootState } from '@/store/types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  fileAnchor: undefined,
};

const namespaced = true;

const files: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default files;
