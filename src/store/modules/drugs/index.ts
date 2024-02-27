import { Module } from 'vuex';

import Drug from '@/classes/Drug';
import getBaseDefaultState from '@/services/store/baseModule/baseIndex';
import IBasicState from '@/services/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<Drug>;
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Drug),
  };
};

const state = getDefaultState();

const namespaced = true;

export const drugs: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
