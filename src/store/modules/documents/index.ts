import { Module } from 'vuex';

import Document from '@/classes/Document';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Document>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Document),
  };
};

const state = getDefaultState();

const namespaced = true;

export const documents: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};