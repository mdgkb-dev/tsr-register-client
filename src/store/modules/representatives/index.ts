import { Module } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Representative> {
  lastInsertedId?: string;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Representative),
    lastInsertedId: undefined,
  };
};

const state = getDefaultState();

const namespaced = true;

export const representatives: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
