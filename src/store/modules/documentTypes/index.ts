import { Module } from 'vuex';
import State from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { RootState } from '@/store/types';

export const state: State = {
  documentType: undefined,
  documentTypes: []
}

const namespaced = true;

const documentTypes: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}

export default documentTypes
