import { Module } from 'vuex';
import { RootState } from '@/store/types';
import State from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state: State = {
  documentType: undefined,
  documentTypes: [],
};

const namespaced = true;

const documentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export default documentTypes;
