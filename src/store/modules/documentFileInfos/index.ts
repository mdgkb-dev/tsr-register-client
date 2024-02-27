import { Module } from 'vuex';

import DocumentFileInfo from '@/classes/DocumentFileInfo';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DocumentFileInfo>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DocumentFileInfo),
  };
};

const state = getDefaultState();

const namespaced = true;

export const documentFileInfos: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
