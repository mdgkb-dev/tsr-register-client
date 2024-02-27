import { Module } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Representative> {
  lastInsertedId?: string;
  existsInDomain: boolean;
}

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Representative),
    lastInsertedId: undefined,
    existsInDomain: false,
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
