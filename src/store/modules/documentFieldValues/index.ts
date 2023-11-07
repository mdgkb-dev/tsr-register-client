import { Module } from 'vuex';

import DocumentFieldValue from '@/classes/DocumentFieldValue';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<DocumentFieldValue>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(DocumentFieldValue),
  };
};

const state = getDefaultState();

const namespaced = true;

export const documentFieldValues: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
