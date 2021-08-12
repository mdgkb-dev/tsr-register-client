import { Module } from 'vuex';

import { RootState } from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import State from './state';

import DocumentType from '@/classes/documents/DocumentType';

export const state: State = {
  documentType: new DocumentType(),
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
